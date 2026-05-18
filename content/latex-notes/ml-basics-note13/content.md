## Summary

优化器（Optimizer）是神经网络训练中真正负责更新参数的算法。反向传播会给出损失函数对参数的梯度，但梯度只是“变化趋势”的信息，不等于最终的更新量。不同优化器会以不同方式使用当前梯度、历史梯度、梯度平方、参数变化和曲率信息，从而决定参数应当如何移动。理解优化器的分类和适用场景，是理解 SGD、Momentum、Adam、L-BFGS 以及 PINN 中 Adam + L-BFGS 两阶段训练策略的基础。

## 为什么需要优化器

前向传播负责得到预测结果，损失函数负责衡量预测误差，反向传播负责计算损失函数对参数的梯度：

$$
\nabla_\theta L.
$$

但梯度算出来之后，参数究竟该如何更新，并不是由反向传播来决定的。最简单的更新方式是梯度下降：

$$
\theta_{k+1}
=
\theta_k
-
\eta \nabla_\theta L.
$$

它确实可以工作，但真实训练中，损失面通常非常复杂：梯度可能有噪声，不同方向的尺度可能差异很大，某些方向会剧烈震荡，另一些方向下降很慢。因此，仅靠最原始的梯度下降往往不够，我们需要更稳定、更高效、更适合复杂问题的参数更新规则，这就是优化器存在的原因。

## 优化器在训练流程中的位置

完整训练链条可以写成

$$
\mathbf{x}
\rightarrow
\hat{\mathbf{y}}
\rightarrow
L
\rightarrow
\nabla_\theta L
\rightarrow
\theta_{\mathrm{new}}.
$$

其中：

- 从 $L$ 到 $\nabla_\theta L$ 是反向传播的任务。
- 从 $\nabla_\theta L$ 到 $\theta_{\mathrm{new}}$ 是优化器的任务。

在 PyTorch 中，这通常对应为：

1. `optimizer.zero_grad()`：清空上一轮梯度。
2. `pred = model(x)`：前向传播。
3. `loss = loss_fn(pred, y)`：计算损失。
4. `loss.backward()`：反向传播，计算梯度。
5. `optimizer.step()`：优化器根据梯度更新参数。

需要特别区分：`loss.backward()` 不会直接改参数，真正改变参数的是 `optimizer.step()`。

## 优化器的统一视角

为了统一理解不同优化器，可以把参数更新写成

$$
\theta_{k+1}
=
\theta_k
+
\Delta \theta_k.
$$

不同优化器的核心差异，就在于如何计算更新量 $\Delta \theta_k$。

最朴素的梯度下降中，

$$
\Delta \theta_k
=
-\eta g_k,
\qquad
g_k = \nabla_\theta L(\theta_k).
$$

而更复杂的优化器不会只看当前梯度。例如：

- Momentum 会利用历史梯度方向。
- Adam 会同时考虑梯度的一阶矩和二阶矩。
- L-BFGS 会利用参数变化与梯度变化去近似曲率信息。

因此可以把优化器抽象地理解为

$$
\Delta \theta_k
=
\mathcal{O}(g_k, \text{history}).
$$

也就是说，优化器的任务不是“机械地沿梯度走一步”，而是依据梯度及其历史信息，选择更合适的搜索方向和步长。

## 优化器分类

从“使用了什么信息”和“适用于什么场景”两个角度，可以把常见优化器分成几类。

当前这套从机器学习到 PINN 的笔记里，最值得优先掌握的是前三类：

- 基础一阶优化器：GD、SGD、Mini-batch SGD、Momentum、Nesterov Momentum
- 自适应一阶优化器：AdaGrad、RMSProp、Adam、AdamW、NAdam
- 二阶 / 准二阶优化器：Newton、Gauss-Newton、BFGS、L-BFGS

另外还有一些更偏工程或特殊应用的类别：

- 大模型优化器：Adafactor、LAMB、Lion、8-bit Adam、ZeRO / 分片优化器
- 约束 / 近端优化器：Projected Gradient Descent、Proximal Gradient、ADMM
- 无梯度优化器：遗传算法、粒子群、CMA-ES、贝叶斯优化
- 分布式 / 联邦优化器：Distributed SGD、Local SGD、FedAvg、FedProx

这些分类并不是完全互斥的。例如 AdamW 同时属于自适应一阶优化器，也常用于大模型训练。

## 基础一阶优化器

基础一阶优化器只使用一阶梯度信息

$$
g_k = \nabla_\theta L(\theta_k),
$$

不显式使用 Hessian 或曲率矩阵。

### SGD 与 Mini-batch SGD

严格意义上的随机梯度下降（SGD）每次只用一个样本估计梯度：

$$
\theta_{k+1}
=
\theta_k
-
\eta \nabla_\theta L_i(\theta_k).
$$

但在深度学习代码里，大家常说的 SGD 往往指 mini-batch SGD，即每次使用一个小批量样本 $\mathcal{B}$：

$$
L_{\mathcal{B}}(\theta)
=
\frac{1}{|\mathcal{B}|}
\sum_{i \in \mathcal{B}} L_i(\theta),
$$

$$
\theta_{k+1}
=
\theta_k
-
\eta \nabla_\theta L_{\mathcal{B}}(\theta_k).
$$

它的优点是简单、计算开销低，并且噪声有时还会帮助模型跳出不理想区域；缺点是训练轨迹比较抖动，对学习率较敏感。

### Momentum

Momentum 仍然属于一阶优化器，因为它使用的仍然是梯度，只是加入了历史方向记忆：

$$
v_k = \beta v_{k-1} + g_k,
$$

$$
\theta_{k+1}
=
\theta_k - \eta v_k.
$$

其中 $v_k$ 可以理解为速度项，$\beta$ 控制历史方向的保留程度。

如果最近几步的梯度方向较一致，Momentum 会在这个方向上加速；如果梯度在某个方向来回震荡，历史平均则能部分抵消这种抖动。因此它特别适合狭长峡谷式的损失面。

### Nesterov Momentum

Nesterov Momentum 可以看成是 Momentum 的前瞻型改进。普通 Momentum 先根据当前位置算梯度，再更新速度；Nesterov 则先沿历史速度“往前看一步”，再在这个预估位置计算梯度。

直观上，它像是在移动之前先看一下前方地形，因此在某些问题中可以更早修正方向，减少过冲。

## 自适应一阶优化器

自适应一阶优化器仍然只依赖梯度，但会根据梯度统计量自动调整不同参数的有效步长。

### AdaGrad

AdaGrad 累积历史梯度平方：

$$
s_k = s_{k-1} + g_k^2,
$$

并使用

$$
\theta_{k+1}
=
\theta_k
-
\eta
\frac{g_k}{\sqrt{s_k} + \epsilon}
$$

更新参数。

如果某个参数历史梯度一直较大，那么它未来的有效步长会自动减小；而梯度较稀疏的参数则能获得更大的相对更新。因此 AdaGrad 很适合稀疏特征问题。但它的问题是 $s_k$ 会不断增大，后期学习率可能衰减得过小。

### RMSProp

RMSProp 可以看成 AdaGrad 的改进，它不累计全部历史平方梯度，而是使用指数滑动平均：

$$
s_k = \beta s_{k-1} + (1-\beta) g_k^2.
$$

更新形式仍是

$$
\theta_{k+1}
=
\theta_k
-
\eta
\frac{g_k}{\sqrt{s_k} + \epsilon}.
$$

由于更早期的梯度影响会逐渐衰减，RMSProp 能避免 AdaGrad 后期学习率过小的问题，因此更适合非平稳目标和深层网络。

### Adam

Adam 可以理解为 Momentum 和 RMSProp 的结合。它同时维护梯度的一阶矩和二阶矩：

$$
m_k = \beta_1 m_{k-1} + (1-\beta_1) g_k,
$$

$$
v_k = \beta_2 v_{k-1} + (1-\beta_2) g_k^2.
$$

然后用偏差修正后的统计量进行更新：

$$
\theta_{k+1}
=
\theta_k
-
\eta
\frac{\hat{m}_k}{\sqrt{\hat{v}_k} + \epsilon}.
$$

Adam 的优点是稳健、收敛较快、对学习率没有普通 SGD 那么敏感，因此是深度学习和 PINN 中最常用的优化器之一。缺点是后期精细收敛未必总是最优，loss 虽然下降了，但物理误差或泛化误差仍可能需要进一步检查。

### AdamW

AdamW 是 Adam 的一个重要改进，它把权重衰减（Weight Decay）从梯度更新中解耦出来。普通 Adam 中的 L2 正则和自适应学习率会发生耦合，而 AdamW 则把参数衰减作为单独操作处理，因此在现代深度学习训练中更稳定、更清晰，也更适合大模型场景。

## 二阶 / 准二阶优化器

这一类优化器关心的不只是梯度方向，还试图利用曲率信息来提高更新质量。

### Newton 方法

Newton 方法的理想更新形式为

$$
\theta_{k+1}
=
\theta_k
-
H_k^{-1} g_k,
$$

其中

$$
H_k = \nabla_\theta^2 L(\theta_k)
$$

是 Hessian 矩阵。

它的优点是局部收敛速度很快；缺点是 Hessian 的计算和求逆都极其昂贵，对大规模神经网络几乎不可直接使用。因此完整的 Newton 方法很少直接用于现代深度学习训练。

### BFGS

BFGS 属于拟牛顿法。它不直接构造 Hessian，而是根据参数变化

$$
s_k = \theta_{k+1} - \theta_k
$$

和梯度变化

$$
y_k = g_{k+1} - g_k
$$

去逐步更新 Hessian 或其逆的近似。

它比 Newton 便宜，但如果参数量太大，显式存储矩阵近似依然代价高。

### L-BFGS

L-BFGS（Limited-memory BFGS）是 BFGS 的低内存版本。它只保留最近若干步的 $s_k$ 和 $y_k$，而不是存完整矩阵，因此大幅降低了内存开销。

它非常适合后期精细收敛，尤其适合 full-batch、较平滑、较确定的损失函数。但它单步成本较高，若 mini-batch 噪声较大，曲率近似会受到明显干扰。

## 不同优化策略会产生不同路径

即使目标损失相同，不同优化器在损失面上走出的参数路径也可能明显不同：

- 普通梯度下降容易在狭长峡谷中来回震荡。
- Momentum 会沿长期一致的方向加速。
- 自适应优化器会为不同参数分配不同有效步长。
- L-BFGS 会尝试利用近似曲率，走出更“聪明”的路径。

Figure omitted in web version; see source PDF.

这说明优化器不是简单的“学习率工具”，而是决定参数搜索路径的重要算法。

## 大模型优化器的用途和场景

大模型优化器更多是工程应用意义上的分类，而不是纯数学分类。它们主要服务于大规模 Transformer、语言模型、扩散模型和视觉大模型训练，重点解决：

- 参数量巨大时优化器状态占用显存过高。
- batch size 很大，需要稳定的大批量训练。
- 多 GPU / 多节点训练中的通信与显存瓶颈。
- 权重衰减、学习率调度和混合精度的稳定配合。

常见代表包括 AdamW、Adafactor、LAMB、Lion、8-bit Adam、ZeRO / 分片优化器。

## 约束 / 近端优化器的用途和场景

当参数或解必须满足某些显式约束时，就会用到约束 / 近端优化思想。例如投影梯度下降：

$$
\theta_{k+1}
=
\Pi_{\mathcal{C}}
\left(
\theta_k - \eta \nabla f(\theta_k)
\right),
$$

其中 $\Pi_{\mathcal{C}}$ 表示投影回可行域 $\mathcal{C}$。

这类方法常用于：

- 参数非负或必须处于特定范围。
- L1 正则与稀疏优化。
- 图像反问题、变分问题。
- 接触、塑性、不可穿透等带约束力学问题。
- 多物理场约束耦合。

## 无梯度优化器的用途和场景

无梯度优化器不依赖梯度，适用于目标函数不可导、梯度不可得或整体过程是黑箱的情况。常见方法包括遗传算法、粒子群、CMA-ES 和贝叶斯优化。

它们常用于：

- 黑箱仿真优化。
- 超参数搜索。
- 离散变量或组合优化。
- 实验代价昂贵的问题。
- 工程设计参数寻优。

但它们通常不适合直接训练大规模神经网络，因为参数维数太高，搜索效率会非常低。

## 分布式 / 联邦优化器的用途和场景

分布式优化器用于数据或模型太大，单机难以训练的场景；联邦优化器用于数据分散在不同设备或机构、又不能集中汇总的情况。

常见代表有 Distributed SGD、Local SGD、FedAvg 和 FedProx。它们关注的重点是：

- 多 GPU / 多节点并行训练。
- 大规模数据集训练。
- 数据分散、隐私保护。
- 通信成本控制。

例如 FedAvg 的核心思想是各客户端先本地训练若干步，再由服务器对参数做平均。这类方法的重点不在单步梯度公式本身，而在协同训练机制。

## 为什么 PINN 常用 Adam + L-BFGS

在 PINN 中，非常常见的训练策略是

$$
\text{Adam 预训练}
\quad \rightarrow \quad
\text{L-BFGS 精修}.
$$

这是因为：

- Adam 在前期更稳健，适合把随机初始化的参数快速带入一个较合理的区域。
- L-BFGS 在后期更适合做 full-batch 精细收敛，有利于进一步降低 PDE 残差和边界误差。

但要注意：Adam + L-BFGS 并不会自动保证结果正确。如果 PDE、边界条件、本构关系或自动微分实现本身有错误，优化器只能把“错误定义下的 loss”降下来，而不能替代物理建模和代码正确性的检查。

## 如何判断优化器是否合适

判断优化器是否合适，可以关注这些现象：

- loss 是否能稳定下降。
- 各子 loss 是否同步改善。
- 梯度是否长期接近零或异常大。
- 是否出现 `NaN` 或 `Inf`。
- 位移、应力、残差云图是否合理。
- 切换优化器后是否带来实际改善。

对 PINN 来说，仅看总 loss 远远不够，还需要结合 PDE 残差、边界误差、应力误差和关键物理量分布来判断。

## 常见误区

- 误区一：反向传播就是优化器。  
  反向传播只负责算梯度，优化器才负责更新参数。
- 误区二：Momentum 不是一阶优化器。  
  它仍然只依赖梯度信息，只是加入了历史方向记忆。
- 误区三：Adam 一定比 SGD 好。  
  Adam 更稳健，但在某些任务中 SGD 或 L-BFGS 也可能更合适。
- 误区四：换优化器就能解决所有训练问题。  
  如果 loss 设计、边界条件或自动微分本身有误，单纯换优化器无法根治。

## 一页总结

- 优化器的作用是根据梯度决定参数如何更新。
- 反向传播计算梯度，优化器使用梯度更新参数，两者不是同一回事。
- 基础一阶优化器包括 SGD、Mini-batch SGD、Momentum 和 Nesterov Momentum。
- 自适应一阶优化器包括 AdaGrad、RMSProp、Adam 和 AdamW。
- 二阶 / 准二阶优化器包括 Newton、BFGS 和 L-BFGS。
- PINN 中常见 Adam + L-BFGS 的两阶段训练策略：Adam 负责前期稳健预训练，L-BFGS 负责后期精细收敛。
