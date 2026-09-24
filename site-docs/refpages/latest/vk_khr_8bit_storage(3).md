# VK_KHR_8bit_storage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_8bit_storage.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_8bit_storage](#VK_KHR_8bit_storage)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
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

VK_KHR_8bit_storage - device extension

**Name String**

`VK_KHR_8bit_storage`

**Extension Type**

Device extension

**Registered Extension Number**

178

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
[SPV_KHR_8bit_storage](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_8bit_storage.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Alexander Galazin [alegal-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_8bit_storage] @alegal-arm%0A*Here describe the issue or question you have about the VK_KHR_8bit_storage extension*)

**Last Modified Date**

2018-02-05

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_shader_16bit_storage`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_EXT_shader_16bit_storage.txt)

**IP Status**

No known IP claims.

**Contributors**

* 
Alexander Galazin, Arm

The `VK_KHR_8bit_storage` extension allows use of 8-bit types in uniform and
storage buffers, and push constant blocks.
This extension introduces several new optional features which map to SPIR-V
capabilities and allow access to 8-bit data in `Block`-decorated objects
in the `Uniform` and the `StorageBuffer` storage classes, and objects
in the `PushConstant` storage class.

The `StorageBuffer8BitAccess` capability **must** be supported by all
implementations of this extension.
The other capabilities are optional.

Vulkan APIs in this extension are included in core Vulkan 1.2, with the KHR
suffix omitted.
However, if Vulkan 1.2 is supported and this extension is not, the
`StorageBuffer8BitAccess` capability is optional.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

If Vulkan 1.4 is supported, support for the `storageBuffer8BitAccess`
capability is required.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevice8BitStorageFeaturesKHR](VkPhysicalDevice8BitStorageFeatures.html)

* 
`VK_KHR_8BIT_STORAGE_EXTENSION_NAME`

* 
`VK_KHR_8BIT_STORAGE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_8BIT_STORAGE_FEATURES_KHR](VkStructureType.html)

* 
[    `StorageBuffer8BitAccess`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-StorageBuffer8BitAccess)

* 
[    `UniformAndStorageBuffer8BitAccess`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-UniformAndStorageBuffer8BitAccess)

* 
[    `StoragePushConstant8`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-StoragePushConstant8)

* 
Revision 1, 2018-02-05 (Alexander Galazin)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_8bit_storage).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
