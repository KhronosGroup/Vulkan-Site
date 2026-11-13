# SubgroupGeMask(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SubgroupGeMask.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SubgroupGeMask - Mask of shader invocations in a subgroup with the same or higher subgroup local invocation ID

`SubgroupGeMask`

Decorating a variable with the `SubgroupGeMask` builtin decoration will
make that variable contain the *subgroup mask* of the current subgroup
invocation.
The bits corresponding to the invocations greater than or equal to
`SubgroupLocalInvocationId` through `SubgroupSize`-1 are set in the
variable decorated with `SubgroupGeMask`.
All other bits are set to zero.

`SubgroupGeMaskKHR` is an alias of `SubgroupGeMask`.

Valid Usage

* 
[](#VUID-SubgroupGeMask-SubgroupGeMask-04372) VUID-SubgroupGeMask-SubgroupGeMask-04372

The variable decorated with `SubgroupGeMask` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupGeMask-SubgroupGeMask-04373) VUID-SubgroupGeMask-SubgroupGeMask-04373

The variable decorated with `SubgroupGeMask` **must** be declared as a
four-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
