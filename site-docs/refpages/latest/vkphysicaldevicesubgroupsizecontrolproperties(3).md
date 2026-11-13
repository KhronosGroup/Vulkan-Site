# VkPhysicalDeviceSubgroupSizeControlProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSubgroupSizeControlProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSubgroupSizeControlProperties - Structure describing the control subgroup size properties of an implementation

The `VkPhysicalDeviceSubgroupSizeControlProperties` structure is defined
as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceSubgroupSizeControlProperties {
    VkStructureType       sType;
    void*                 pNext;
    uint32_t              minSubgroupSize;
    uint32_t              maxSubgroupSize;
    uint32_t              maxComputeWorkgroupSubgroups;
    VkShaderStageFlags    requiredSubgroupSizeStages;
} VkPhysicalDeviceSubgroupSizeControlProperties;

// Provided by VK_EXT_subgroup_size_control
// Equivalent to VkPhysicalDeviceSubgroupSizeControlProperties
typedef VkPhysicalDeviceSubgroupSizeControlProperties VkPhysicalDeviceSubgroupSizeControlPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `minSubgroupSize` is the
minimum subgroup size supported by this device.
`minSubgroupSize` is at least one if any of the physical device’s
queues support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) or
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html).
`minSubgroupSize` is a power-of-two.
`minSubgroupSize` is less than or equal to `maxSubgroupSize`.
`minSubgroupSize` is less than or equal to [    `subgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-subgroupSize).

* 
 `maxSubgroupSize` is the
maximum subgroup size supported by this device.
`maxSubgroupSize` is at least one if any of the physical device’s
queues support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) or
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html).
`maxSubgroupSize` is a power-of-two.
`maxSubgroupSize` is greater than or equal to `minSubgroupSize`.
`maxSubgroupSize` is greater than or equal to [    `subgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-subgroupSize).

* 

`maxComputeWorkgroupSubgroups` is the maximum number of subgroups
supported by the implementation within a workgroup.

* 

`requiredSubgroupSizeStages` is a bitfield of what shader stages
support having a required subgroup size specified.

If the `VkPhysicalDeviceSubgroupSizeControlProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

If [VkPhysicalDeviceSubgroupProperties](VkPhysicalDeviceSubgroupProperties.html)::`supportedOperations`
includes [](../../../../spec/latest/chapters/limits.html#features-subgroup-quad)[VK_SUBGROUP_FEATURE_QUAD_BIT](VkSubgroupFeatureFlagBits.html),
`minSubgroupSize` **must** be greater than or equal to 4.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSubgroupSizeControlProperties-sType-sType) VUID-VkPhysicalDeviceSubgroupSizeControlProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_subgroup_size_control](VK_EXT_subgroup_size_control.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceSubgroupSizeControlProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
