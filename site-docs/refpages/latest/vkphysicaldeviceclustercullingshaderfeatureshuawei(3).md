# VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI - Structure describing whether cluster culling shader is enabled

The `VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI` structure is
defined as:

// Provided by VK_HUAWEI_cluster_culling_shader
typedef struct VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           clustercullingShader;
    VkBool32           multiviewClusterCullingShader;
} VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `clustercullingShader` specifies
whether cluster culling shader is supported.

* 

`multiviewClusterCullingShader` specifies whether multiview is
supported.

If the `VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI-sType-sType) VUID-VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_FEATURES_HUAWEI](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_HUAWEI_cluster_culling_shader](VK_HUAWEI_cluster_culling_shader.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
