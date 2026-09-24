# SubgroupLtMask(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SubgroupLtMask.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SubgroupLtMask - Mask of shader invocations in a subgroup with a lower subgroup local invocation ID

`SubgroupLtMask`

Decorating a variable with the `SubgroupLtMask` builtin decoration will
make that variable contain the *subgroup mask* of the current subgroup
invocation.
The bits corresponding to the invocations less than
`SubgroupLocalInvocationId` are set in the variable decorated with
`SubgroupLtMask`.
All other bits are set to zero.

`SubgroupLtMaskKHR` is an alias of `SubgroupLtMask`.

Valid Usage

* 
[](#VUID-SubgroupLtMask-SubgroupLtMask-04378) VUID-SubgroupLtMask-SubgroupLtMask-04378

The variable decorated with `SubgroupLtMask` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupLtMask-SubgroupLtMask-04379) VUID-SubgroupLtMask-SubgroupLtMask-04379

The variable decorated with `SubgroupLtMask` **must** be declared as a
four-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
