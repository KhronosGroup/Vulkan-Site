# VkPhysicalDeviceMaintenance11FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance11FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance11FeaturesKHR - Structure describing whether the implementation supports maintenance11 functionality

The `VkPhysicalDeviceMaintenance11FeaturesKHR` structure is defined as:

// Provided by VK_KHR_maintenance11
typedef struct VkPhysicalDeviceMaintenance11FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance11;
} VkPhysicalDeviceMaintenance11FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance11` indicates that the
implementation supports the following:

[VK_IMAGE_CREATE_ALIAS_SINGLE_LAYER_DESCRIPTOR_BIT_KHR](VkImageCreateFlagBits.html)

* 
The depth clipping state of the pipeline is well defined when the
pipeline is created without
[VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](VkDynamicState.html) being set
and the [VkPipelineRasterizationDepthClipStateCreateInfoEXT](VkPipelineRasterizationDepthClipStateCreateInfoEXT.html)
structure is not present

* 
[VK_SHADER_CREATE_INDEPENDENT_SETS_BIT_KHR](VkShaderCreateFlagBitsEXT.html)

* 
Allow `queueFamilyIndexCount` of 1 in [VkBufferCreateInfo](VkBufferCreateInfo.html),
     [VkImageCreateInfo](VkImageCreateInfo.html),
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](VkPhysicalDeviceImageDrmFormatModifierInfoEXT.html),
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)
     when `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html)

* 
Require `minImageTransferGranularity` to be (1,1,1) even on
transfer-only queues and add `optimalImageTransferGranularity`
queue family property to communicate the performance bump for copies
not aligned to the optimal granularity

* 
When copying between a buffer and an image on a transfer-only queue, do
not require `bufferOffset` to be a multiple of 4

If the `VkPhysicalDeviceMaintenance11FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMaintenance11FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance11FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance11FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_11_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_maintenance11](VK_KHR_maintenance11.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMaintenance11FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
