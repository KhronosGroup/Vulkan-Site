# VK_ONLY_EXPORTED_PROTOTYPES(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ONLY_EXPORTED_PROTOTYPES.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ONLY_EXPORTED_PROTOTYPES - Vulkan header file exported prototype inclusion control

If the `VK_ONLY_EXPORTED_PROTOTYPES` macro is defined by an application
at compile time, only prototypes for Vulkan APIs tagged as `"exported"`in
the API XML will be included.
For non-tagged APIs, only typedefs for API function pointers will be
defined.

This is intended to match APIs which are statically exported by the Vulkan
loader.
At present, the exported APIs are only those defined by Vulkan core
versions.

If the macro is not defined by the application, prototypes for all Vulkan
APIs will be included.

[VK_NO_PROTOTYPES](VK_NO_PROTOTYPES.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
