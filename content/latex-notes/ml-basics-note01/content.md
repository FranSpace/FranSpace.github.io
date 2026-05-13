## Summary

机器学习的核心不是“让计算机变聪明”，而是通过一个带参数的模型去学习输入和输出之间的映射关系。

普通监督学习主要依赖数据标签；PINN 则进一步把控制方程、边界条件和初始条件等物理约束也写进损失函数中。

因此，从机器学习过渡到 PINN，最重要的变化是：

$$
\text{只依赖数据}
\quad \longrightarrow \quad
\text{同时依赖数据和物理方程}.
$$

## 从一个映射关系开始

机器学习最基本的问题可以理解为：

$$
\mathbf{x} \mapsto \mathbf{y}.
$$

这里：

- $\mathbf{x}$ 表示输入；
- $\mathbf{y}$ 表示输出；
- 模型的任务是学习从 $\mathbf{x}$ 到 $\mathbf{y}$ 的映射关系。

例如，在图像识别问题中：

$$
\text{图片} \mapsto \text{类别}.
$$

在房价预测问题中：

$$
\text{房屋面积、位置、楼层等信息} \mapsto \text{房价}.
$$

在固体力学 PINN 问题中，如果用神经网络预测位移场，则可以写成：

$$
\mathbf{X} \mapsto \mathbf{u}(\mathbf{X}),
$$

其中：

- $\mathbf{X}$ 是参考构形中的空间坐标；
- $\mathbf{u}(\mathbf{X})$ 是该点的位移；
- 神经网络用于近似未知位移场。

也就是说，在 PINN 中，神经网络可以看成一个函数近似器：

$$
\mathbf{u}_{\theta}(\mathbf{X}) \approx \mathbf{u}(\mathbf{X}),
$$

其中 $\theta$ 表示神经网络中的全部可训练参数。

## Analysis

从这个角度看，神经网络并不是神秘的东西。它本质上就是一个非常灵活的参数化函数。

训练神经网络，就是不断调整参数 $\theta$，使得这个函数越来越接近我们想要的目标函数。

## 模型、参数和超参数

为了学习映射关系，我们需要先选定一个模型。模型可以理解为一个带参数的函数：

$$
\hat{\mathbf{y}} = f_{\theta}(\mathbf{x}).
$$

其中：

- $\mathbf{x}$ 是输入；
- $\hat{\mathbf{y}}$ 是模型预测值；
- $\theta$ 是模型参数；
- $f_{\theta}$ 是由参数 $\theta$ 决定的函数。

在神经网络中，参数通常包括：

$$
\theta = \{W^{(1)}, b^{(1)}, W^{(2)}, b^{(2)}, \cdots\}.
$$

其中：

- $W^{(l)}$ 是第 $l$ 层的权重矩阵；
- $b^{(l)}$ 是第 $l$ 层的偏置向量。

这些参数是在训练过程中自动更新的。

### 模型参数

模型参数是网络自己通过训练学到的量。例如：

$$
z = wx + b.
$$

这里的 $w$ 和 $b$ 就是模型参数。

训练之前，它们通常被随机初始化；训练过程中，它们会根据损失函数的梯度不断更新。

### 超参数

超参数是训练开始之前人为设定的量，例如：

- 学习率；
- 网络层数；
- 每层神经元个数；
- batch size；
- epoch 数量；
- 优化器类型；
- loss 权重。

这些量一般不会通过反向传播自动学习，而是需要人为选择或通过实验调整。

## Remark

初学时容易混淆“参数”和“超参数”。

简单区分方法是：

$$
\text{训练过程中自动更新的是参数，训练前人为设定的是超参数。}
$$

例如，神经网络中的 $w, b$ 是参数；学习率、网络深度、batch size 是超参数。

## 损失函数为什么重要

模型给出预测值以后，我们需要知道预测得好不好。这个“好不好”需要用一个函数来衡量，这个函数就是损失函数。

对于监督学习，如果真实值是 $\mathbf{y}$，预测值是 $\hat{\mathbf{y}}$，常见的均方误差为：

$$
L
=
\frac{1}{N}
\sum_{i=1}^{N}
\left\|
\hat{\mathbf{y}}_i - \mathbf{y}_i
\right\|^2.
$$

损失函数越小，说明预测值和真实值越接近。

因此，训练神经网络的目标可以写成一个优化问题：

$$
\min_{\theta} L(\theta).
$$

也就是说：

$$
\text{训练神经网络}
=
\text{寻找一组参数 } \theta
\text{，使损失函数尽量小}.
$$

## Example

假设只有一个简单模型：

$$
\hat{y} = wx + b.
$$

如果真实数据满足 $y \approx 2x + 1$，那么训练的目标就是让模型逐渐学到：

$$
w \approx 2,
\qquad
b \approx 1.
$$

损失函数的作用就是告诉模型当前的 $w, b$ 离理想值还有多远。

## 普通监督学习

普通监督学习依赖一组带标签的数据：

$$
\{(\mathbf{x}_i, \mathbf{y}_i)\}_{i=1}^{N}.
$$

训练过程可以概括为：

- 输入 $\mathbf{x}_i$；
- 神经网络输出预测值 $\hat{\mathbf{y}}_i$；
- 用损失函数比较 $\hat{\mathbf{y}}_i$ 和 $\mathbf{y}_i$；
- 通过反向传播计算损失对参数的梯度；
- 使用优化器更新参数；
- 重复很多次，直到模型预测较准确。

这个过程可以简写为：

$$
\mathbf{x}
\overset{f_{\theta}}{\longrightarrow}
\hat{\mathbf{y}}
\overset{L}{\longrightarrow}
\text{误差}
\overset{\text{反向传播}}{\longrightarrow}
\nabla_{\theta}L
\overset{\text{优化器}}{\longrightarrow}
\theta \text{更新}.
$$

## Analysis

普通监督学习的核心信息来自数据标签。

如果标签很多且质量很好，监督学习可以取得很好的效果。但在很多科学计算和工程问题中，高质量标签数据可能很难获得，例如需要大量有限元仿真或实验测量。

## 从监督学习到 PINN

PINN 的全称是 Physics-Informed Neural Network，即物理信息神经网络。

它的核心思想是：

$$
\text{不只让网络拟合数据，还要求网络满足物理方程。}
$$

在普通监督学习中，损失函数通常是：

$$
L_{\mathrm{data}}
=
\frac{1}{N}
\sum_{i=1}^{N}
\left\|
\mathbf{u}_{\theta}(\mathbf{X}_i)
-
\mathbf{u}_i
\right\|^2.
$$

其中 $\mathbf{u}_i$ 是已知数据标签。

而在 PINN 中，即使没有很多标签数据，也可以利用控制方程构造损失。

例如，对于静力固体力学问题，参考构形下的平衡方程可以写成：

$$
\mathrm{Div}\,\mathbf{P} + \mathbf{B} = \mathbf{0}.
$$

其中：

- $\mathbf{P}$ 是第一类 Piola--Kirchhoff 应力；
- $\mathbf{B}$ 是体力；
- $\mathrm{Div}\,\mathbf{P}$ 表示对应力场求散度。

如果神经网络预测位移场：

$$
\mathbf{u}_{\theta}(\mathbf{X}),
$$

就可以通过自动微分计算变形梯度、应力以及平衡方程残差。

于是 PDE 残差损失可以写成：

$$
L_{\mathrm{pde}}
=
\frac{1}{N_r}
\sum_{i=1}^{N_r}
\left\|
\mathrm{Div}\,\mathbf{P}_{\theta}(\mathbf{X}_i)
+
\mathbf{B}(\mathbf{X}_i)
\right\|^2.
$$

边界条件也可以写进损失函数。

例如 Dirichlet 位移边界：

$$
\mathbf{u} = \bar{\mathbf{u}}
\quad
\text{on } \Gamma_D,
$$

对应损失：

$$
L_D
=
\frac{1}{N_D}
\sum_{i=1}^{N_D}
\left\|
\mathbf{u}_{\theta}(\mathbf{X}_i)
-
\bar{\mathbf{u}}(\mathbf{X}_i)
\right\|^2.
$$

Neumann 力边界：

$$
\mathbf{P}\mathbf{N}
=
\bar{\mathbf{T}}
\quad
\text{on } \Gamma_N,
$$

对应损失：

$$
L_N
=
\frac{1}{N_N}
\sum_{i=1}^{N_N}
\left\|
\mathbf{P}_{\theta}(\mathbf{X}_i)\mathbf{N}(\mathbf{X}_i)
-
\bar{\mathbf{T}}(\mathbf{X}_i)
\right\|^2.
$$

因此，PINN 的总损失通常写成：

$$
L
=
\lambda_r L_{\mathrm{pde}}
+
\lambda_D L_D
+
\lambda_N L_N
+
\lambda_{\mathrm{data}} L_{\mathrm{data}}.
$$

其中：

- $L_{\mathrm{pde}}$ 约束控制方程；
- $L_D$ 约束位移边界；
- $L_N$ 约束力边界；
- $L_{\mathrm{data}}$ 约束已有观测数据；
- $\lambda_r, \lambda_D, \lambda_N, \lambda_{\mathrm{data}}$ 是不同损失项的权重。

## Summary

普通神经网络主要通过数据告诉模型“答案是什么”。

PINN 则进一步告诉模型：

$$
\text{你的答案不仅要接近数据，还必须满足物理方程和边界条件。}
$$

因此，PINN 的训练目标不是单一的数据拟合，而是多个物理约束共同作用下的优化问题。

## 普通机器学习和 PINN 的区别

普通监督学习和 PINN 的区别可以总结为：

- 主要信息来源：普通监督学习依赖数据标签；PINN 同时依赖数据与物理方程。
- 输入形式：普通监督学习常用样本特征；PINN 更常见的是空间坐标、时间坐标或场变量采样点。
- 输出形式：普通监督学习输出标签预测值；PINN 输出物理场变量，例如位移、温度、压力或应力相关量。
- 损失函数：普通监督学习主要是数据误差；PINN 则通常是 PDE 残差、边界残差与数据误差的组合。
- 核心难点：普通监督学习更强调泛化能力；PINN 还需要处理 loss 平衡、自动微分、边界约束和采样策略。

对于固体力学 PINN 来说，网络的预测结果不能只看位移是否大致正确，还需要检查：

- 平衡方程残差是否足够小；
- Dirichlet 边界是否满足；
- Neumann 边界是否满足；
- 应力结果是否与有限元结果一致；
- 角点和界面区域是否出现局部大误差；
- 不同 loss 项是否存在尺度不平衡。

## Remark

PINN 中一个非常重要的经验是：

$$
\text{总 loss 下降} \neq \text{物理结果一定正确}.
$$

尤其在固体力学问题中，位移趋势看起来正确，并不代表应力场也正确。

因为应力通常依赖位移梯度，甚至依赖非线性本构关系，对误差更加敏感。

## 一页总结

- 机器学习的基本目标是学习一个映射关系：

$$
\mathbf{x} \mapsto \mathbf{y}.
$$

- 神经网络可以看成一个带参数的函数：

$$
\hat{\mathbf{y}} = f_{\theta}(\mathbf{x}).
$$

- 训练神经网络就是寻找一组参数 $\theta$，使损失函数最小：

$$
\min_{\theta} L(\theta).
$$

- 普通监督学习主要依赖数据标签，通过数据误差训练模型。
- PINN 不只利用数据，还把控制方程、边界条件和初始条件写进损失函数。
- 对固体力学 PINN，常见损失包括 PDE 残差、Dirichlet 边界损失、Neumann 边界损失和数据损失。
- PINN 中不能只看总 loss，还要分别检查位移、应力、残差、边界条件和误差云图。
- 从普通神经网络过渡到 PINN，最关键的变化是：

$$
\text{从数据拟合问题}
\quad \longrightarrow \quad
\text{物理约束优化问题}.
$$
