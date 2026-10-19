# VK_NO_STDDEF_H(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NO_STDDEF_H.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NO_STDDEF_H - Control definition of  types

If the `VK_NO_STDDEF_H` macro is defined by the application at compile
time, `size_t`, **must** also be defined by the application.
Otherwise, the Vulkan headers will not compile.
If `VK_NO_STDDEF_H` is not defined, the system `` is used to
define this type.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/boilerplate.html#boilerplate-platform-specific-header-control).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
