# VK_KHR_storage_buffer_storage_class(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_storage_buffer_storage_class.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_storage_buffer_storage_class](#VK_KHR_storage_buffer_storage_class)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_storage_buffer_storage_class - device extension

**Name String**

`VK_KHR_storage_buffer_storage_class`

**Extension Type**

Device extension

**Registered Extension Number**

132

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_KHR_storage_buffer_storage_class](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_storage_buffer_storage_class.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Alexander Galazin [alegal-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_storage_buffer_storage_class] @alegal-arm%0A*Here describe the issue or question you have about the VK_KHR_storage_buffer_storage_class extension*)

**Last Modified Date**

2017-09-05

**IP Status**

No known IP claims.

**Contributors**

* 
Alexander Galazin, ARM

* 
David Neto, Google

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_KHR_storage_buffer_storage_class`

This extension provides a new SPIR-V `StorageBuffer` storage class.
A `Block`-decorated object in this class is equivalent to a
`BufferBlock`-decorated object in the `Uniform` storage class.

All functionality in this extension is included in core Vulkan 1.1.

* 
`VK_KHR_STORAGE_BUFFER_STORAGE_CLASS_EXTENSION_NAME`

* 
`VK_KHR_STORAGE_BUFFER_STORAGE_CLASS_SPEC_VERSION`

* 
Revision 1, 2017-03-23 (Alexander Galazin)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_storage_buffer_storage_class).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
