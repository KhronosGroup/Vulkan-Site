# VkFrameBoundaryEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFrameBoundaryEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFrameBoundaryEXT - Add frame boundary information to queue submissions

The `VkFrameBoundaryEXT` structure is defined as:

// Provided by VK_EXT_frame_boundary
typedef struct VkFrameBoundaryEXT {
    VkStructureType            sType;
    const void*                pNext;
    VkFrameBoundaryFlagsEXT    flags;
    uint64_t                   frameID;
    uint32_t                   imageCount;
    const VkImage*             pImages;
    uint32_t                   bufferCount;
    const VkBuffer*            pBuffers;
    uint64_t                   tagName;
    size_t                     tagSize;
    const void*                pTag;
} VkFrameBoundaryEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkFrameBoundaryFlagBitsEXT](VkFrameBoundaryFlagBitsEXT.html) that can
flag the last submission of a frame identifier.

* 
`frameID` is the frame identifier.

* 
`imageCount` is the number of images that store frame results.

* 
`pImages` is a pointer to an array of VkImage objects with
imageCount entries.

* 
`bufferCount` is the number of buffers the store the frame results.

* 
`pBuffers` is a pointer to an array of VkBuffer objects with
bufferCount entries.

* 
`tagName` is a numerical identifier for tag data.

* 
`tagSize` is the number of bytes of tag data.

* 
`pTag` is a pointer to an array of `tagSize` bytes containing
tag data.

The application **can** associate frame boundary information to a queue
submission call by adding a `VkFrameBoundaryEXT` structure to the
`pNext` chain of [queue submission](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-submission),
[VkPresentInfoKHR](VkPresentInfoKHR.html),
or [VkBindSparseInfo](VkBindSparseInfo.html).

|  | The frame identifier is used to associate one or more queue submissions to a
| --- | --- |
frame.
It is meant to be unique within a frame lifetime, i.e. it is possible
(though not recommended) to reuse frame identifiers, as long as any two
frames that may have overlapping queue submissions (as in the example above)
use different frame identifiers.

Since the concept of frame is application-dependent, there is no way to
validate the use of frame identifier.
It is good practice to use a monotonically increasing counter as the frame
identifier and not reuse identifiers between frames. |

The `pImages` and `pBuffers` arrays contain a list of images and
buffers which store the “end result” of the frame.
As the concept of frame is application-dependent, not all frames **may**
produce their results in images or buffers, yet this is a sufficiently
common case to be handled by `VkFrameBoundaryEXT`.
Note that no extra information, such as image layout is being provided,
since the images are meant to be used by tools which would already be
tracking this required information.
Having the possibility of passing a list of end-result images makes
`VkFrameBoundaryEXT` as expressive as [vkQueuePresentKHR](vkQueuePresentKHR.html), which is
often the default frame boundary delimiter.

The application **can** also associate arbitrary extra information via tag data
using `tagName`, `tagSize` and `pTag`.
This extra information is typically tool-specific.

Valid Usage (Implicit)

* 
[](#VUID-VkFrameBoundaryEXT-sType-sType) VUID-VkFrameBoundaryEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAME_BOUNDARY_EXT](VkStructureType.html)

* 
[](#VUID-VkFrameBoundaryEXT-flags-parameter) VUID-VkFrameBoundaryEXT-flags-parameter

 `flags` **must** be a valid combination of [VkFrameBoundaryFlagBitsEXT](VkFrameBoundaryFlagBitsEXT.html) values

* 
[](#VUID-VkFrameBoundaryEXT-pImages-parameter) VUID-VkFrameBoundaryEXT-pImages-parameter

 If `imageCount` is not `0`, and `pImages` is not `NULL`, `pImages` **must** be a valid pointer to an array of `imageCount` valid [VkImage](VkImage.html) handles

* 
[](#VUID-VkFrameBoundaryEXT-pBuffers-parameter) VUID-VkFrameBoundaryEXT-pBuffers-parameter

 If `bufferCount` is not `0`, and `pBuffers` is not `NULL`, `pBuffers` **must** be a valid pointer to an array of `bufferCount` valid [VkBuffer](VkBuffer.html) handles

* 
[](#VUID-VkFrameBoundaryEXT-pTag-parameter) VUID-VkFrameBoundaryEXT-pTag-parameter

 If `tagSize` is not `0`, and `pTag` is not `NULL`, `pTag` **must** be a valid pointer to an array of `tagSize` bytes

* 
[](#VUID-VkFrameBoundaryEXT-commonparent) VUID-VkFrameBoundaryEXT-commonparent

 Both of the elements of `pBuffers`, and the elements of `pImages` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindSparseInfo](VkBindSparseInfo.html)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

* 
[VkSubmitInfo](VkSubmitInfo.html)

* 
[VkSubmitInfo2](VkSubmitInfo2.html)

[VK_EXT_frame_boundary](VK_EXT_frame_boundary.html), [VkBuffer](VkBuffer.html), [VkFrameBoundaryFlagsEXT](VkFrameBoundaryFlagsEXT.html), [VkImage](VkImage.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkFrameBoundaryEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
