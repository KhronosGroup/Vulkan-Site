# VK_EXT_transform_feedback(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_transform_feedback.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_transform_feedback](#VK_EXT_transform_feedback)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_transform_feedback - device extension

**Name String**

`VK_EXT_transform_feedback`

**Extension Type**

Device extension

**Registered Extension Number**

29

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Uses**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

* 
[Developer tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_transform_feedback] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_transform_feedback extension*)

**Last Modified Date**

2018-10-09

**Contributors**

* 
Baldur Karlsson, Valve

* 
Boris Zanin, Mobica

* 
Daniel Rakos, AMD

* 
Donald Scorgie, Imagination

* 
Henri Verbeet, CodeWeavers

* 
Jan-Harald Fredriksen, Arm

* 
Faith Ekstrand, Intel

* 
Jeff Bolz, NVIDIA

* 
Jesse Barker, Unity

* 
Jesse Hall, Google

* 
Pierre-Loup Griffais, Valve

* 
Philip Rebohle, DXVK

* 
Ruihao Zhang, Qualcomm

* 
Samuel Pitoiset, Valve

* 
Slawomir Grajewski, Intel

* 
Stu Smith, Imagination Technologies

This extension adds transform feedback to the Vulkan API by exposing the
SPIR-V `TransformFeedback` and `GeometryStreams` capabilities to
capture vertex, tessellation, or geometry shader outputs to one or more
buffers.
It adds API functionality to bind transform feedback buffers to capture the
primitives emitted by the graphics pipeline from SPIR-V outputs decorated
for transform feedback.
The transform feedback capture can be paused and resumed by way of storing
and retrieving a byte counter.
The captured data can be drawn again where the vertex count is derived from
the byte counter without CPU intervention.
If the implementation is capable, a vertex stream other than zero can be
rasterized.

All these features are designed to match the full capabilities of OpenGL
core transform feedback functionality and beyond.
Many of the features are optional to allow base OpenGL ES GPUs to also
implement this extension.

The primary purpose of the functionality exposed by this extension is to
support translation layers from other 3D APIs.
This functionality is not considered forward looking, and is not expected to
be promoted to a KHR extension or to core Vulkan.
Unless this is needed for translation, it is recommended that developers use
alternative techniques of using the GPU to process and capture vertex data.

* 
[vkCmdBeginQueryIndexedEXT](vkCmdBeginQueryIndexedEXT.html)

* 
[vkCmdBeginTransformFeedbackEXT](vkCmdBeginTransformFeedbackEXT.html)

* 
[vkCmdBindTransformFeedbackBuffersEXT](vkCmdBindTransformFeedbackBuffersEXT.html)

* 
[vkCmdDrawIndirectByteCountEXT](vkCmdDrawIndirectByteCountEXT.html)

* 
[vkCmdEndQueryIndexedEXT](vkCmdEndQueryIndexedEXT.html)

* 
[vkCmdEndTransformFeedbackEXT](vkCmdEndTransformFeedbackEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceTransformFeedbackFeaturesEXT](VkPhysicalDeviceTransformFeedbackFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](VkPhysicalDeviceTransformFeedbackPropertiesEXT.html)

Extending [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html):

* 
[VkPipelineRasterizationStateStreamCreateInfoEXT](VkPipelineRasterizationStateStreamCreateInfoEXT.html)

* 
[VkPipelineRasterizationStateStreamCreateFlagsEXT](VkPipelineRasterizationStateStreamCreateFlagsEXT.html)

* 
`VK_EXT_TRANSFORM_FEEDBACK_EXTENSION_NAME`

* 
`VK_EXT_TRANSFORM_FEEDBACK_SPEC_VERSION`

* 
Extending [VkAccessFlagBits](VkAccessFlagBits.html):

[VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](VkAccessFlagBits.html)

* 
[VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](VkAccessFlagBits.html)

* 
[VK_ACCESS_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](VkAccessFlagBits.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)

Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

* 
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

Extending [VkQueryType](VkQueryType.html):

* 
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](VkQueryType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TRANSFORM_FEEDBACK_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TRANSFORM_FEEDBACK_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_STREAM_CREATE_INFO_EXT](VkStructureType.html)

1) Should we include pause/resume functionality?

**RESOLVED**: Yes, this is needed to ease layering other APIs which have this
functionality.
To pause use `vkCmdEndTransformFeedbackEXT` and provide valid buffer
handles in the `pCounterBuffers` array and offsets in the
`pCounterBufferOffsets` array for the implementation to save the resume
points.
Then to resume use `vkCmdBeginTransformFeedbackEXT` with the previous
`pCounterBuffers` and `pCounterBufferOffsets` values.
Between the pause and resume there needs to be a memory barrier for the
counter buffers with a source access of
[VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](VkAccessFlagBits.html) at pipeline stage
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html) to a destination access
of [VK_ACCESS_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](VkAccessFlagBits.html) at pipeline stage
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html).

2) How does this interact with multiview?

**RESOLVED**: Transform feedback cannot be made active in a render pass with
multiview enabled.

3) How should queries be done?

**RESOLVED**: There is a new query type
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](VkQueryType.html).
A query pool created with this type will capture 2 integers -
numPrimitivesWritten and numPrimitivesNeeded - for the specified vertex
stream output from the last
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization).
The vertex stream output queried is zero by default, but can be specified
with the new `vkCmdBeginQueryIndexedEXT` and
`vkCmdEndQueryIndexedEXT` commands.

* 
Revision 1, 2018-10-09 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_transform_feedback).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
