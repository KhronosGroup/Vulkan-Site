# VkPhysicalDeviceTransformFeedbackPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceTransformFeedbackPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceTransformFeedbackPropertiesEXT - Structure describing transform feedback properties that can be supported by an implementation

The `VkPhysicalDeviceTransformFeedbackPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_transform_feedback
typedef struct VkPhysicalDeviceTransformFeedbackPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxTransformFeedbackStreams;
    uint32_t           maxTransformFeedbackBuffers;
    VkDeviceSize       maxTransformFeedbackBufferSize;
    uint32_t           maxTransformFeedbackStreamDataSize;
    uint32_t           maxTransformFeedbackBufferDataSize;
    uint32_t           maxTransformFeedbackBufferDataStride;
    VkBool32           transformFeedbackQueries;
    VkBool32           transformFeedbackStreamsLinesTriangles;
    VkBool32           transformFeedbackRasterizationStreamSelect;
    VkBool32           transformFeedbackDraw;
} VkPhysicalDeviceTransformFeedbackPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxTransformFeedbackStreams`
is the maximum number of vertex streams that can be output from geometry
shaders declared with the `GeometryStreams` capability.
If the implementation does not support
`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`geometryStreams`
then `maxTransformFeedbackStreams` **must** be `1`.

* 
 `maxTransformFeedbackBuffers`
is the maximum number of transform feedback buffers that can be bound
for capturing shader outputs from the last
[pre-rasterization shader    stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization).

* 

`maxTransformFeedbackBufferSize` is the maximum size that can be
specified when binding a buffer for transform feedback in
[vkCmdBindTransformFeedbackBuffersEXT](vkCmdBindTransformFeedbackBuffersEXT.html).

* 

`maxTransformFeedbackStreamDataSize` is the maximum amount of data
in bytes for each vertex that captured to one or more transform feedback
buffers associated with a specific vertex stream.

* 

`maxTransformFeedbackBufferDataSize` is the maximum amount of data
in bytes for each vertex that can be captured to a specific transform
feedback buffer.

* 

`maxTransformFeedbackBufferDataStride` is the maximum stride between
each capture of vertex data to the buffer.

* 
 `transformFeedbackQueries` is
[VK_TRUE](VK_TRUE.html) if the implementation supports the
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](VkQueryType.html) query type.
`transformFeedbackQueries` is [VK_FALSE](VK_FALSE.html) if queries of this type
**cannot** be created.

* 

`transformFeedbackStreamsLinesTriangles` is [VK_TRUE](VK_TRUE.html) if the
implementation supports the geometry shader `OpExecutionMode` of
`OutputLineStrip` and `OutputTriangleStrip` in addition to
`OutputPoints` when more than one vertex stream is output.
If `transformFeedbackStreamsLinesTriangles` is [VK_FALSE](VK_FALSE.html) the
implementation only supports an `OpExecutionMode` of
`OutputPoints` when more than one vertex stream is output from the
geometry shader.

* 

`transformFeedbackRasterizationStreamSelect` is [VK_TRUE](VK_TRUE.html) if the
implementation supports the `GeometryStreams` SPIR-V capability and
the application can use
[VkPipelineRasterizationStateStreamCreateInfoEXT](VkPipelineRasterizationStateStreamCreateInfoEXT.html) to modify which
vertex stream output is used for rasterization.
Otherwise vertex stream `0` **must** always be used for rasterization.

* 
 `transformFeedbackDraw` is
[VK_TRUE](VK_TRUE.html) if the implementation supports the
[vkCmdDrawIndirectByteCountEXT](vkCmdDrawIndirectByteCountEXT.html) function otherwise the function
**must** not be called.

If the `VkPhysicalDeviceTransformFeedbackPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTransformFeedbackPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceTransformFeedbackPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TRANSFORM_FEEDBACK_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html), `VkBool32`, `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
