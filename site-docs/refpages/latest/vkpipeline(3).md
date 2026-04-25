# VkPipeline(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipeline.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipeline - Opaque handle to a pipeline object

Compute,
ray tracing,
and
graphics
pipelines are each represented by `VkPipeline` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPipeline)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkDataGraphPipelineInfoARM](VkDataGraphPipelineInfoARM.html), [VkDataGraphPipelineSessionCreateInfoARM](VkDataGraphPipelineSessionCreateInfoARM.html), [VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html), [VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html), [VkGeneratedCommandsMemoryRequirementsInfoNV](VkGeneratedCommandsMemoryRequirementsInfoNV.html), [VkGeneratedCommandsPipelineInfoEXT](VkGeneratedCommandsPipelineInfoEXT.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkGraphicsPipelineShaderGroupsCreateInfoNV](VkGraphicsPipelineShaderGroupsCreateInfoNV.html), [VkIndirectExecutionSetPipelineInfoEXT](VkIndirectExecutionSetPipelineInfoEXT.html), [VkPipelineBinaryCreateInfoKHR](VkPipelineBinaryCreateInfoKHR.html), [VkPipelineExecutableInfoKHR](VkPipelineExecutableInfoKHR.html), [VkPipelineIndirectDeviceAddressInfoNV](VkPipelineIndirectDeviceAddressInfoNV.html), [VkPipelineInfoKHR](VkPipelineInfoKHR.html), [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html), [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html), [VkReleaseCapturedPipelineDataInfoKHR](VkReleaseCapturedPipelineDataInfoKHR.html), [VkWriteIndirectExecutionSetPipelineEXT](VkWriteIndirectExecutionSetPipelineEXT.html), [vkCmdBindPipeline](vkCmdBindPipeline.html), [vkCmdBindPipelineShaderGroupNV](vkCmdBindPipelineShaderGroupNV.html), [vkCmdInitializeGraphScratchMemoryAMDX](vkCmdInitializeGraphScratchMemoryAMDX.html), [vkCmdUpdatePipelineIndirectBufferNV](vkCmdUpdatePipelineIndirectBufferNV.html), [vkCompileDeferredNV](vkCompileDeferredNV.html), [vkCreateComputePipelines](vkCreateComputePipelines.html), [vkCreateDataGraphPipelinesARM](vkCreateDataGraphPipelinesARM.html), [vkCreateExecutionGraphPipelinesAMDX](vkCreateExecutionGraphPipelinesAMDX.html), [vkCreateGraphicsPipelines](vkCreateGraphicsPipelines.html), [vkCreateRayTracingPipelinesKHR](vkCreateRayTracingPipelinesKHR.html), [vkCreateRayTracingPipelinesNV](vkCreateRayTracingPipelinesNV.html), [vkDestroyPipeline](vkDestroyPipeline.html), [vkGetExecutionGraphPipelineNodeIndexAMDX](vkGetExecutionGraphPipelineNodeIndexAMDX.html), [vkGetExecutionGraphPipelineScratchSizeAMDX](vkGetExecutionGraphPipelineScratchSizeAMDX.html), [vkGetRayTracingCaptureReplayShaderGroupHandlesKHR](vkGetRayTracingCaptureReplayShaderGroupHandlesKHR.html), [vkGetRayTracingShaderGroupHandlesKHR](vkGetRayTracingShaderGroupHandlesKHR.html), [vkGetRayTracingShaderGroupHandlesKHR](vkGetRayTracingShaderGroupHandlesKHR.html), [vkGetRayTracingShaderGroupStackSizeKHR](vkGetRayTracingShaderGroupStackSizeKHR.html), [vkGetShaderInfoAMD](vkGetShaderInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipeline).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
