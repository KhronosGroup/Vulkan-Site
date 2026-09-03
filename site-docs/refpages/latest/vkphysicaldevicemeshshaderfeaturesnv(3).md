# VkPhysicalDeviceMeshShaderFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMeshShaderFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMeshShaderFeaturesNV - Structure describing mesh shading features that can be supported by an implementation

The `VkPhysicalDeviceMeshShaderFeaturesNV` structure is defined as:

// Provided by VK_NV_mesh_shader
typedef struct VkPhysicalDeviceMeshShaderFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           taskShader;
    VkBool32           meshShader;
} VkPhysicalDeviceMeshShaderFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `taskShader` specifies whether task
shaders are supported.
If this feature is not enabled, the [VK_SHADER_STAGE_TASK_BIT_NV](VkShaderStageFlagBits.html)
and [VK_PIPELINE_STAGE_TASK_SHADER_BIT_NV](VkPipelineStageFlagBits.html) enum values **must** not be
used.

* 
 `meshShader` specifies whether mesh
shaders are supported.
If this feature is not enabled, the [VK_SHADER_STAGE_MESH_BIT_NV](VkShaderStageFlagBits.html)
and [VK_PIPELINE_STAGE_MESH_SHADER_BIT_NV](VkPipelineStageFlagBits.html) enum values **must** not be
used.

If the `VkPhysicalDeviceMeshShaderFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMeshShaderFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMeshShaderFeaturesNV-sType-sType) VUID-VkPhysicalDeviceMeshShaderFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_mesh_shader](VK_NV_mesh_shader.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMeshShaderFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
