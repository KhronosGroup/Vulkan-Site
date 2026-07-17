# SubgroupSize(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SubgroupSize.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SubgroupSize - Size of a subgroup

`SubgroupSize`

Decorating a variable with the `SubgroupSize` builtin decoration will
make that variable contain the implementation-dependent
[number of invocations in a subgroup](../../../../spec/latest/chapters/devsandqueues.html#limits-subgroupSize).
This value **must** be a power-of-two integer.

If the shader was created with [varying subgroup size allowed](../../../../spec/latest/chapters/shaders.html#shaders-varying-subgroup-size), the `SubgroupSize` decorated variable will
contain the subgroup size for each subgroup that gets dispatched.
This value **must** be between [`minSubgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-minSubgroupSize) and [`maxSubgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxSubgroupSize) and **must** be uniform with [subgroup scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-subgroup).

If the shader was created with a [required subgroup size](../../../../spec/latest/chapters/shaders.html#shaders-required-subgroup-size), the `SubgroupSize` decorated variable will match that
value.

If the shader does not allow [varying subgroup sizes](../../../../spec/latest/chapters/shaders.html#shaders-varying-subgroup-size), the
variable decorated with `SubgroupSize` will match [`subgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-subgroupSize).

The maximum number of invocations that an implementation can support per
subgroup is 128.

Valid Usage

* 
[](#VUID-SubgroupSize-SubgroupSize-04382) VUID-SubgroupSize-SubgroupSize-04382

The variable decorated with `SubgroupSize` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupSize-SubgroupSize-04383) VUID-SubgroupSize-SubgroupSize-04383

The variable decorated with `SubgroupSize` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
