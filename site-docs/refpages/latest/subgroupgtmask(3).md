# SubgroupGtMask(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SubgroupGtMask.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SubgroupGtMask - Mask of shader invocations in a subgroup with a higher subgroup local invocation ID

`SubgroupGtMask`

Decorating a variable with the `SubgroupGtMask` builtin decoration will
make that variable contain the *subgroup mask* of the current subgroup
invocation.
The bits corresponding to the invocations greater than
`SubgroupLocalInvocationId` through `SubgroupSize`-1 are set in the
variable decorated with `SubgroupGtMask`.
All other bits are set to zero.

`SubgroupGtMaskKHR` is an alias of `SubgroupGtMask`.

Valid Usage

* 
[](#VUID-SubgroupGtMask-SubgroupGtMask-04374) VUID-SubgroupGtMask-SubgroupGtMask-04374

The variable decorated with `SubgroupGtMask` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupGtMask-SubgroupGtMask-04375) VUID-SubgroupGtMask-SubgroupGtMask-04375

The variable decorated with `SubgroupGtMask` **must** be declared as a
four-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
