# VK_KHR_vulkan_memory_model(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_vulkan_memory_model.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_vulkan_memory_model](#VK_KHR_vulkan_memory_model)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_vulkan_memory_model - device extension

**Name String**

`VK_KHR_vulkan_memory_model`

**Extension Type**

Device extension

**Registered Extension Number**

212

**Revision**

3

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_vulkan_memory_model](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_vulkan_memory_model.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_vulkan_memory_model] @jeffbolznv%0A*Here describe the issue or question you have about the VK_KHR_vulkan_memory_model extension*)

**Last Modified Date**

2018-12-10

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Alan Baker, Google

* 
Tobias Hector, AMD

* 
David Neto, Google

* 
Robert Simpson, Qualcomm Technologies, Inc.

* 
Brian Sumner, AMD

The [VK_KHR_vulkan_memory_model](#) extension allows use of the features
guarded by the `VulkanMemoryModel`, `VulkanMemoryModelDeviceScope`,
and `VulkanMemoryModelAvailabilityVisibilityChains` capabilities in
shader modules.
The [Vulkan Memory Model](../../../../spec/latest/appendices/memorymodel.html#memory-model) formally defines how to synchronize
memory accesses to the same memory locations performed by multiple shader
invocations.

|  | Version 3 of the spec added a member
| --- | --- |
(`vulkanMemoryModelAvailabilityVisibilityChains`) to
[VkPhysicalDeviceVulkanMemoryModelFeaturesKHR](VkPhysicalDeviceVulkanMemoryModelFeatures.html), which is an incompatible
change from version 2. |

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
However, if Vulkan 1.2 is supported and this extension is not, the
`vulkanMemoryModel` capability is optional.
The original type, enum, and command names are still available as aliases of
the core functionality.

If Vulkan 1.3 is supported, support for the `vulkanMemoryModel` and
`vulkanMemoryModelDeviceScope` capabilities is required.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVulkanMemoryModelFeaturesKHR](VkPhysicalDeviceVulkanMemoryModelFeatures.html)

* 
`VK_KHR_VULKAN_MEMORY_MODEL_EXTENSION_NAME`

* 
`VK_KHR_VULKAN_MEMORY_MODEL_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_MEMORY_MODEL_FEATURES_KHR](VkStructureType.html)

* 
[    `VulkanMemoryModelKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-VulkanMemoryModel)

* 
Revision 1, 2018-06-24 (Jeff Bolz)

Initial draft

Revision 3, 2018-12-10 (Jeff Bolz)

* 
Add vulkanMemoryModelAvailabilityVisibilityChains member to the
VkPhysicalDeviceVulkanMemoryModelFeaturesKHR structure.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_vulkan_memory_model).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
