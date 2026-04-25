# SubgroupLeMask(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SubgroupLeMask.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SubgroupLeMask - Mask of shader invocations in a subgroup with the same or lower subgroup local invocation ID

`SubgroupLeMask`

Decorating a variable with the `SubgroupLeMask` builtin decoration will
make that variable contain the *subgroup mask* of the current subgroup
invocation.
The bits corresponding to the invocations less than or equal to
`SubgroupLocalInvocationId` are set in the variable decorated with
`SubgroupLeMask`.
All other bits are set to zero.

`SubgroupLeMaskKHR` is an alias of `SubgroupLeMask`.

Valid Usage

* 
[](#VUID-SubgroupLeMask-SubgroupLeMask-04376) VUID-SubgroupLeMask-SubgroupLeMask-04376

The variable decorated with `SubgroupLeMask` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupLeMask-SubgroupLeMask-04377) VUID-SubgroupLeMask-SubgroupLeMask-04377

The variable decorated with `SubgroupLeMask` **must** be declared as a
four-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
