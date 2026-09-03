# VK_NO_PROTOTYPES(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NO_PROTOTYPES.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NO_PROTOTYPES - Vulkan header file prototype inclusion control

If the `VK_NO_PROTOTYPES` macro is defined by an application at compile
time, prototypes for Vulkan APIs will not be included.
Only typedefs for API function pointers will be defined.

This is intended for applications using their own function loader and
dispatch mechanism.

If the macro is not defined by the application, prototypes for Vulkan APIs
will be included.

[VK_ONLY_EXPORTED_PROTOTYPES](VK_ONLY_EXPORTED_PROTOTYPES.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
