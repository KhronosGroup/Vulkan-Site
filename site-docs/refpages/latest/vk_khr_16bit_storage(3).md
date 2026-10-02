# VK_KHR_16bit_storage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_16bit_storage.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_16bit_storage](#VK_KHR_16bit_storage)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_16bit_storage - device extension

**Name String**

`VK_KHR_16bit_storage`

**Extension Type**

Device extension

**Registered Extension Number**

84

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     and

     [VK_KHR_storage_buffer_storage_class](VK_KHR_storage_buffer_storage_class.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_16bit_storage](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_16bit_storage.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_16bit_storage] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_KHR_16bit_storage extension*)

**Last Modified Date**

2017-09-05

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_shader_16bit_storage`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_EXT_shader_16bit_storage.txt)

**Contributors**

* 
Alexander Galazin, ARM

* 
Jan-Harald Fredriksen, ARM

* 
Joerg Wagner, ARM

* 
Neil Henning, Codeplay

* 
Jeff Bolz, Nvidia

* 
Daniel Koch, Nvidia

* 
David Neto, Google

* 
John Kessenich, Google

The `VK_KHR_16bit_storage` extension allows use of 16-bit types in shader
input and output interfaces, and push constant blocks.
This extension introduces several new optional features which map to SPIR-V
capabilities and allow access to 16-bit data in `Block`-decorated objects
in the `Uniform` and the `StorageBuffer` storage classes, and objects
in the `PushConstant` storage class.
This extension allows 16-bit variables to be declared and used as
user-defined shader inputs and outputs but does not change location
assignment and component assignment rules.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
However, if Vulkan 1.1 is supported and this extension is not, the
`storageBuffer16BitAccess` capability is optional.
The original type, enum, and command names are still available as aliases of
the core functionality.

If Vulkan 1.4 is supported, support for the `storageBuffer16BitAccess`
capability is required.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevice16BitStorageFeaturesKHR](VkPhysicalDevice16BitStorageFeatures.html)

* 
`VK_KHR_16BIT_STORAGE_EXTENSION_NAME`

* 
`VK_KHR_16BIT_STORAGE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_16BIT_STORAGE_FEATURES_KHR](VkStructureType.html)

* 
[    `StorageBuffer16BitAccess`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-StorageBuffer16BitAccess)

* 
[    `UniformAndStorageBuffer16BitAccess`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-UniformAndStorageBuffer16BitAccess)

* 
[    `StoragePushConstant16`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-StoragePushConstant16)

* 
[    `StorageInputOutput16`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-StorageInputOutput16)

* 
Revision 1, 2017-03-23 (Alexander Galazin)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_16bit_storage).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
