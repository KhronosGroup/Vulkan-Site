# VK_HUAWEI_cluster_culling_shader(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_HUAWEI_cluster_culling_shader.html

## Table of Contents

- [Name](#_name)
- [VK_HUAWEI_cluster_culling_shader](#VK_HUAWEI_cluster_culling_shader)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New Built-In Variables](#_new_built_in_variables)
- [New_Built-In_Variables](#_new_built_in_variables)
- [New SPIR-V Capability](#_new_spir_v_capability)
- [New_SPIR-V_Capability](#_new_spir_v_capability)
- [Sample Code](#_sample_code)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_HUAWEI_cluster_culling_shader - device extension

**Name String**

`VK_HUAWEI_cluster_culling_shader`

**Extension Type**

Device extension

**Registered Extension Number**

405

**Revision**

3

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_HUAWEI_cluster_culling_shader](https://github.khronos.org/SPIRV-Registry/extensions/HUAWEI/SPV_HUAWEI_cluster_culling_shader.html)

**Contact**

* 
Yuchang Wang [richard_Wang2](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_HUAWEI_cluster_culling_shader] @richard_Wang2%0A*Here describe the issue or question you have about the VK_HUAWEI_cluster_culling_shader extension*)

**Extension Proposal**

[VK_HUAWEI_cluster_culling_shader](../../../../features/latest/features/proposals/VK_HUAWEI_cluster_culling_shader.html)

**Last Modified Date**

2023-08-16

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_HUAWEI_cluster_culling_shader`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/huawei/GLSL_HUAWEI_cluster_culling_shader.txt).

**Contributors**

* 
Yuchang Wang, Huawei

* 
Juntao Li, Huawei

* 
Pan Gao, Huawei

* 
Jie Cao, Huawei

* 
Yunjin Zhang, Huawei

* 
Shujie Zhou, Huawei

* 
Chaojun Wang, Huawei

* 
Jiajun Hu, Huawei

* 
Cong Zhang, Huawei

Cluster Culling Shaders (CCS) are similar to the existing compute shaders.
Their main purpose is to provide an execution environment in order to
perform coarse-level geometry culling and LOD selection more efficiently on
the GPU.

The traditional 2-pass GPU culling solution using a compute shader sometimes
needs a pipeline barrier between compute and graphics pipeline to optimize
performance.
An additional compaction process may also be required.
This extension addresses these shortcomings, allowing compute shaders to
directly emit visible clusters to the following graphics pipeline.

A set of new built-in output variables are used to express a visible
cluster, including per-cluster shading rate.
In addition, a new built-in function is used to emit these variables from
CCS to the IA stage.
The IA stage can use these variables to fetch vertices of a visible cluster
and drive vertex shaders to shading these vertices.

Note that CCS do not work with geometry or tessellation shaders, but both IA
and vertex shaders are preserved.
Vertex shaders are still used for vertex position shading, instead of
directly outputting transformed vertices from the compute shader.
This makes CCS more suitable for mobile GPUs.

* 
[vkCmdDrawClusterHUAWEI](vkCmdDrawClusterHUAWEI.html)

* 
[vkCmdDrawClusterIndirectHUAWEI](vkCmdDrawClusterIndirectHUAWEI.html)

* 
Extending [VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI](VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI.html):

[VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI](VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI](VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI](VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI.html)

* 
`VK_HUAWEI_CLUSTER_CULLING_SHADER_EXTENSION_NAME`

* 
`VK_HUAWEI_CLUSTER_CULLING_SHADER_SPEC_VERSION`

* 
Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

Extending [VkQueryPipelineStatisticFlagBits](VkQueryPipelineStatisticFlagBits.html):

* 
[VK_QUERY_PIPELINE_STATISTIC_CLUSTER_CULLING_SHADER_INVOCATIONS_BIT_HUAWEI](VkQueryPipelineStatisticFlagBits.html)

Extending [VkShaderStageFlagBits](VkShaderStageFlagBits.html):

* 
[VK_SHADER_STAGE_CLUSTER_CULLING_BIT_HUAWEI](VkShaderStageFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_FEATURES_HUAWEI](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_PROPERTIES_HUAWEI](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_VRS_FEATURES_HUAWEI](VkStructureType.html)

* 
[IndexCountHUAWEI](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-indexcounthuawei)

* 
[VertexCountHUAWEI](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-vertexcounthuawei)

* 
[InstanceCountHUAWEI](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-instancecounthuawei)

* 
[FirstIndexHUAWEI](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-firstindexhuawei)

* 
[FirstVertexHUAWEI](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-firstvertexhuawei)

* 
[VertexOffsetHUAWEI](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-vertexoffsethuawei)

* 
[FirstInstanceHUAWEI](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-firstinstancehuawei)

* 
[ClusterIDHUAWEI](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-clusteridhuawei)

* 
[ClusterShadingRateHUAWEI](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-clustershadingratehuawei)

* 
[    `ClusterCullingShadingHUAWEI`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ClusterCullingShadingHUAWEI)

Example of cluster culling in a GLSL shader

#extension GL_HUAWEI_cluster_culling_shader: enable

#define GPU_WARP_SIZE                   32
#define GPU_GROUP_SIZE                  GPU_WARP_SIZE

#define GPU_CLUSTER_PER_INVOCATION      1
#define GPU_CLUSTER_PER_WORKGROUP       (GPU_GROUP_SIZE * GPU_CLUSTER_PER_INVOCATION)

// Number of threads per workgroup
// - 1D only
// - warpsize = 32
layout(local_size_x=GPU_GROUP_SIZE, local_size_y=1, local_size_z=1) in;

#define GPU_DRAW_BUFFER_BINDING             0
#define GPU_INSTANCE_DESCRIPTOR_BINDING     1

struct BoundingSphere
{
  vec3 center;
  float radius;
};

struct InstanceData
{
  mat4 mvp_matrix;                      // mvp matrix.
  vec4 frustum_planes[6];               // six frustum planes
  mat4 model_matrix_transpose_inverse;  // inverse transpose of model matrix.
  vec3 view_origin;                     // view original
};

struct InstanceDescriptor
{
  uint begin;
  uint end;
  uint cluster_count;
  uint debug;
  BoundingSphere sphere;
  InstanceData instance_data;
};

struct DrawElementsCommand{
  uint indexcount;
  uint instanceCount;
  uint firstIndex;
  int  vertexoffset;
  uint firstInstance;
  uint cluster_id;
};

// indexed mode
out gl_PerClusterHUAWEI{
  uint gl_IndexCountHUAWEI;
  uint gl_InstanceCountHUAWEI;
  uint gl_FirstIndexHUAWEI;
  int  gl_VertexOffsetHUAWEI;
  uint gl_FirstInstanceHUAWEI;
  uint gl_ClusterIDHUAWEI;
  uint gl_ClusterShadingRateHUAWEI;
};

layout(binding = GPU_DRAW_BUFFER_BINDING, std430) buffer draw_indirect_ssbo
{
        DrawElementsCommand draw_commands[];
};

layout(binding = GPU_INSTANCE_DESCRIPTOR_BINDING, std430) buffer instance_descriptor_ssbo
{
        InstanceDescriptor instance_descriptors[];
};

float Distance(uint instance_id)
{
    vec3 v = normalize(instance_descriptor[instance_id].sphere.center -
                     instance_descriptor[instance_id].instance_data.view_origin);
    float dist = sqrt(dot(v,v));

    return dist;
}

bool isSphereOutsideFrustum( vec3 sphere_center, float sphere_radius )
{
  bool isInside = false;

  for(int i = 0; i  0.7)
            gl_ClusterShadingRateHUAWEI =
                gl_ShadingRateFlag4VerticalPixelsEXT | gl_ShadingRateFlag4HorizontalPixelsEXT;
        else if(distance > 0.3)
            gl_ClusterShadingRateHUAWEI =
                gl_ShadingRateFlag2VerticalPixelsEXT | gl_ShadingRateFlag2HorizontalPixelsEXT;
        else
            gl_ClusterShadingRateHUAWEI = 0;

        // this is a visible cluster, update built-in output variable.
        // in case of indexed mode:
        gl_IndexCountHUAWEI     = draw_commands[cluster_id].indexcount;
        gl_InstanceCountHUAWEI  = draw_commands[cluster_id].instanceCount;
        gl_FirstIndexHUAWEI     = draw_commands[cluster_id].firstIndex;
        gl_VertexOffsetHUAWEI   = draw_commands[cluster_id].vertexoffset;
        gl_FirstInstanceHUAWEI  = draw_commands[cluster_id].firstInstance;
        gl_ClusterIDHUAWEI      = draw_commands[cluster_id].cluster_id;

        // emit built-in output variables as a drawing command to subsequent
        // rendering pipeline.
        dispatchClusterHUAWEI();
    }
}

Example of graphics pipeline creation with cluster culling shader

// create a cluster culling shader stage info structure.
VkPipelineShaderStageCreateInfo ccsStageInfo{};
ccsStageInfo.sType = VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_CREATE_INFO;
ccsStageInfo.stage = VK_SHADER_STAGE_CLUSTER_CULLING_BIT_HUAWEI;
ccsStageInfo.module = clustercullingshaderModule;
ccsStageInfo.pName =  "main";

// pipeline shader stage creation
VkPipelineShaderStageCreateInfo shaderStages[] = { ccsStageInfo, vertexShaderStageInfo, fragmentShaderStageInfo };

// create graphics pipeline
VkGraphicsPipelineCreateInfo pipelineInfo{};
pipelineInfo.sType = VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_CREATE_INFO;
pipelineInfo.stageCount = 3;
pipelineInfo.pStage = shaderStages;
pipelineInfo.pVertexInputState = &vertexInputInfo;
// ...
VkPipeline graphicsPipeline;
VkCreateGraphicsPipelines(device, VK_NULL_HANDLE, 1, &pipelineInfo, nullptr, &graphicsPipeline);

Example of launching the execution of cluster culling shader

vkCmdBindPipeline(commandBuffer, VK_PIPELINE_BIND_POINT_GRAPHICS, graphicsPipeline);
vkCmdDrawClusterHUAWEI(commandBuffer, groupCountX, 1, 1);
vkCmdEndRenderPass(commandBuffer);

* 
Revision 1, 2022-11-18 (YuChang Wang)

Internal revisions

Revision 2, 2023-04-02 (Jon Leech)

* 
Grammar edits.

Revision 3, 2023-08-21 (YuChang Wang)

* 
Add per-cluster shading rate.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_HUAWEI_cluster_culling_shader).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
