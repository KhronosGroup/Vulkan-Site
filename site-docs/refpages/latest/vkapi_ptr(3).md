# VKAPI_PTR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VKAPI_PTR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VKAPI_PTR - Vulkan function pointer calling conventions macro

`VKAPI_PTR` is a macro placed between the '(' and '*' in Vulkan API
function pointer declarations.
This macro also controls calling conventions, and typically has the same
definition as `VKAPI_ATTR` or `VKAPI_CALL`, depending on the
compiler.

[VKAPI_ATTR](VKAPI_ATTR.html), [VKAPI_CALL](VKAPI_CALL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/boilerplate.html#boilerplate-platform-specific-calling-conventions).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
