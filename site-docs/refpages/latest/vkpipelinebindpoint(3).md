# VkPipelineBindPoint(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineBindPoint.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineBindPoint - Specify the bind point of a pipeline object to a command buffer

Possible values of [vkCmdBindPipeline](vkCmdBindPipeline.html)::`pipelineBindPoint`,
specifying the bind point of a pipeline object, are:

// Provided by VK_VERSION_1_0
typedef enum VkPipelineBindPoint {
    VK_PIPELINE_BIND_POINT_GRAPHICS = 0,
    VK_PIPELINE_BIND_POINT_COMPUTE = 1,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_shader_enqueue
    VK_PIPELINE_BIND_POINT_EXECUTION_GRAPH_AMDX = 1000134000,
#endif
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR = 1000165000,
  // Provided by VK_HUAWEI_subpass_shading
    VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI = 1000369003,
  // Provided by VK_ARM_data_graph
    VK_PIPELINE_BIND_POINT_DATA_GRAPH_ARM = 1000507000,
  // Provided by VK_NV_ray_tracing
    VK_PIPELINE_BIND_POINT_RAY_TRACING_NV = VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR,
} VkPipelineBindPoint;

* 
[VK_PIPELINE_BIND_POINT_COMPUTE](#) specifies binding as a compute
pipeline.

* 
[VK_PIPELINE_BIND_POINT_GRAPHICS](#) specifies binding as a graphics
pipeline.

* 
[VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](#) specifies binding as a ray
tracing pipeline.

* 
[VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](#) specifies binding as
a subpass shading pipeline.

* 
[VK_PIPELINE_BIND_POINT_EXECUTION_GRAPH_AMDX](#) specifies binding as
an [execution graph pipeline](../../../../spec/latest/chapters/executiongraphs.html#executiongraphs).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorUpdateTemplateCreateInfo](VkDescriptorUpdateTemplateCreateInfo.html), [VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html), [VkGeneratedCommandsMemoryRequirementsInfoNV](VkGeneratedCommandsMemoryRequirementsInfoNV.html), [VkIndirectCommandsLayoutCreateInfoNV](VkIndirectCommandsLayoutCreateInfoNV.html), [VkPipelineIndirectDeviceAddressInfoNV](VkPipelineIndirectDeviceAddressInfoNV.html), [VkSubpassDescription](VkSubpassDescription.html), [VkSubpassDescription2](VkSubpassDescription2.html), [vkCmdBindDescriptorBufferEmbeddedSamplersEXT](vkCmdBindDescriptorBufferEmbeddedSamplersEXT.html), [vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html), [vkCmdBindPipeline](vkCmdBindPipeline.html), [vkCmdBindPipelineShaderGroupNV](vkCmdBindPipelineShaderGroupNV.html), [vkCmdPushDescriptorSet](vkCmdPushDescriptorSet.html), [vkCmdPushDescriptorSet](vkCmdPushDescriptorSet.html), [vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html), [vkCmdUpdatePipelineIndirectBufferNV](vkCmdUpdatePipelineIndirectBufferNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineBindPoint).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
