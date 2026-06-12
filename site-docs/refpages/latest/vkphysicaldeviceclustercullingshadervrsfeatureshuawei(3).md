# VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI - Structure describing whether cluster culling shader support VRS

To query whether a Cluster Culling Shader supports the per-cluster shading
rate feature, include a
`VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI` structure in the
`pNext` chain of the
`VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI` structure.
This structure is defined as:

// Provided by VK_HUAWEI_cluster_culling_shader
typedef struct VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           clusterShadingRate;
} VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `clusterShadingRate` specifies
whether per-cluster shading rates is supported.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI-sType-sType) VUID-VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_VRS_FEATURES_HUAWEI](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI](VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI.html)

[VK_HUAWEI_cluster_culling_shader](VK_HUAWEI_cluster_culling_shader.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
