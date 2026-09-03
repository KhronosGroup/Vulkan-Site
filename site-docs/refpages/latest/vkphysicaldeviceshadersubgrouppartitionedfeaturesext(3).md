# VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT - Structure describing shader subgroup partitioned features that can be supported by an implementation

The `VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_shader_subgroup_partitioned
typedef struct VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderSubgroupPartitioned;
} VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderSubgroupPartitioned`
indicates that the implementation supports
[VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT](../../../../spec/latest/chapters/limits.html#features-subgroup-partitioned).

If the `VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_PARTITIONED_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_shader_subgroup_partitioned](VK_EXT_shader_subgroup_partitioned.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
