# VkPhysicalDeviceShaderSubgroupRotateFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderSubgroupRotateFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderSubgroupRotateFeatures - Structure describing whether subgroup rotation is enabled

The `VkPhysicalDeviceShaderSubgroupRotateFeatures` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceShaderSubgroupRotateFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderSubgroupRotate;
    VkBool32           shaderSubgroupRotateClustered;
} VkPhysicalDeviceShaderSubgroupRotateFeatures;

// Provided by VK_KHR_shader_subgroup_rotate
// Equivalent to VkPhysicalDeviceShaderSubgroupRotateFeatures
typedef VkPhysicalDeviceShaderSubgroupRotateFeatures VkPhysicalDeviceShaderSubgroupRotateFeaturesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderSubgroupRotate` specifies whether shader modules **can** declare
the `GroupNonUniformRotateKHR` capability.

* 

`shaderSubgroupRotateClustered` specifies whether shader modules
**can** use the `ClusterSize` operand to
`OpGroupNonUniformRotateKHR`.

If the `VkPhysicalDeviceShaderSubgroupRotateFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderSubgroupRotateFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderSubgroupRotateFeatures-sType-sType) VUID-VkPhysicalDeviceShaderSubgroupRotateFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_ROTATE_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_shader_subgroup_rotate](VK_KHR_shader_subgroup_rotate.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderSubgroupRotateFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
