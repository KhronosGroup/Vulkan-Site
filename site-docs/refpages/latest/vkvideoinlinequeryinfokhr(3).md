# VkVideoInlineQueryInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoInlineQueryInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoInlineQueryInfoKHR - Structure specifying inline query information for video coding commands

The `VkVideoInlineQueryInfoKHR` structure is defined as:

// Provided by VK_KHR_video_maintenance1
typedef struct VkVideoInlineQueryInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkQueryPool        queryPool;
    uint32_t           firstQuery;
    uint32_t           queryCount;
} VkVideoInlineQueryInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queryPool` is `VK_NULL_HANDLE` or a valid handle to a
[VkQueryPool](VkQueryPool.html) object that will manage the results of the queries.

* 
`firstQuery` is the query index within the query pool that will
contain the query results for the first video coding operation.
The query results of subsequent video coding operations will be
contained by subsequent query indices.

* 
`queryCount` is the number of queries to execute.

|  | In practice, if `queryPool` is not `VK_NULL_HANDLE`, then
| --- | --- |
`queryCount` will always have to match the number of video coding
operations issued by the video coding command this structure is specified
to, meaning that using inline queries in a video coding command will always
execute a query for each issued video coding operation. |

This structure **can** be included in the `pNext` chain of the input
parameter structure of video coding commands.

* 
In the `pNext` chain of the `pDecodeInfo` parameter of the
[vkCmdDecodeVideoKHR](vkCmdDecodeVideoKHR.html) command to execute a query for each video
decode operation issued by the command.

* 
In the `pNext` chain of the `pEncodeInfo` parameter of the
[vkCmdEncodeVideoKHR](vkCmdEncodeVideoKHR.html) command to execute a query for each video
encode operation issued by the command.

Valid Usage

* 
[](#VUID-VkVideoInlineQueryInfoKHR-queryPool-08372) VUID-VkVideoInlineQueryInfoKHR-queryPool-08372

If `queryPool` is not `VK_NULL_HANDLE`, then `firstQuery`
**must** be less than the number of queries in `queryPool`

* 
[](#VUID-VkVideoInlineQueryInfoKHR-queryPool-08373) VUID-VkVideoInlineQueryInfoKHR-queryPool-08373

If `queryPool` is not `VK_NULL_HANDLE`, then the sum of
`firstQuery` and `queryCount` **must** be less than or equal to the
number of queries in `queryPool`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoInlineQueryInfoKHR-sType-sType) VUID-VkVideoInlineQueryInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_INLINE_QUERY_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoInlineQueryInfoKHR-queryPool-parameter) VUID-VkVideoInlineQueryInfoKHR-queryPool-parameter

 If `queryPool` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)

* 
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)

[VK_KHR_video_maintenance1](VK_KHR_video_maintenance1.html), [VkQueryPool](VkQueryPool.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoInlineQueryInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
