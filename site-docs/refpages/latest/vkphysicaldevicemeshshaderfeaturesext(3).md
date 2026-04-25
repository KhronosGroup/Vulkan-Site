# VkPhysicalDeviceMeshShaderFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMeshShaderFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMeshShaderFeaturesEXT - Structure describing mesh shading features that can be supported by an implementation

The `VkPhysicalDeviceMeshShaderFeaturesEXT` structure is defined as:

// Provided by VK_EXT_mesh_shader
typedef struct VkPhysicalDeviceMeshShaderFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           taskShader;
    VkBool32           meshShader;
    VkBool32           multiviewMeshShader;
    VkBool32           primitiveFragmentShadingRateMeshShader;
    VkBool32           meshShaderQueries;
} VkPhysicalDeviceMeshShaderFeaturesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `taskShader` specifies whether task shaders
are supported.
If this feature is not enabled, the [VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html)
and [VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html) enum values **must** not be
used.

* 
 `meshShader` specifies whether mesh shaders
are supported.
If this feature is not enabled, the [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html)
and [VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html) enum values **must** not be
used.

* 
 `multiviewMeshShader` specifies
whether the implementation supports [    `multiview`](../../../../spec/latest/chapters/features.html#features-multiview) rendering within a render pass, with mesh shaders.
If this feature is not enabled, then a pipeline compiled against a
subpass with a non-zero view mask **must** not include a mesh shader.

* 

`primitiveFragmentShadingRateMeshShader` indicates that the
implementation supports the [    primitive fragment shading rate](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-primitive) in mesh shaders.

* 
 `meshShaderQueries` indicates that
the implementation supports creating query pools using the
[VK_QUERY_TYPE_MESH_PRIMITIVES_GENERATED_EXT](VkQueryType.html) query type and
statistic queries containing the
[VK_QUERY_PIPELINE_STATISTIC_TASK_SHADER_INVOCATIONS_BIT_EXT](VkQueryPipelineStatisticFlagBits.html) and
[VK_QUERY_PIPELINE_STATISTIC_MESH_SHADER_INVOCATIONS_BIT_EXT](VkQueryPipelineStatisticFlagBits.html) flags

If the `VkPhysicalDeviceMeshShaderFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMeshShaderFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

The corresponding features of the `VkPhysicalDeviceMeshShaderFeaturesNV`
structure **must** match those in `VkPhysicalDeviceMeshShaderFeaturesEXT`.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-multiviewMeshShader-07032) VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-multiviewMeshShader-07032

If `multiviewMeshShader` is enabled then
`VkPhysicalDeviceMultiviewFeaturesKHR`::`multiview` **must** also
be enabled

* 
[](#VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-primitiveFragmentShadingRateMeshShader-07033) VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-primitiveFragmentShadingRateMeshShader-07033

If `primitiveFragmentShadingRateMeshShader` is enabled then
`VkPhysicalDeviceFragmentShadingRateFeaturesKHR`::`primitiveFragmentShadingRate`
**must** also be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMeshShaderFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
