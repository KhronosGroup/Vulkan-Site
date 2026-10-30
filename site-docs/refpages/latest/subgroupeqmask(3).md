# SubgroupEqMask(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SubgroupEqMask.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SubgroupEqMask - Mask of shader invocations in a subgroup with the same subgroup local invocation ID

`SubgroupEqMask`

Decorating a variable with the `SubgroupEqMask` builtin decoration will
make that variable contain the *subgroup mask* of the current subgroup
invocation.
The bit corresponding to the `SubgroupLocalInvocationId` is set in the
variable decorated with `SubgroupEqMask`.
All other bits are set to zero.

`SubgroupEqMaskKHR` is an alias of `SubgroupEqMask`.

Valid Usage

* 
[](#VUID-SubgroupEqMask-SubgroupEqMask-04370) VUID-SubgroupEqMask-SubgroupEqMask-04370

The variable decorated with `SubgroupEqMask` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupEqMask-SubgroupEqMask-04371) VUID-SubgroupEqMask-SubgroupEqMask-04371

The variable decorated with `SubgroupEqMask` **must** be declared as a
four-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
