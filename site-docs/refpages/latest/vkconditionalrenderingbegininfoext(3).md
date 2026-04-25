# VkConditionalRenderingBeginInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkConditionalRenderingBeginInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkConditionalRenderingBeginInfoEXT - Structure specifying conditional rendering begin information

The `VkConditionalRenderingBeginInfoEXT` structure is defined as:

|  | This functionality is superseded by [VkConditionalRenderingBeginInfo2EXT](../../../../spec/latest/chapters/drawing.html#VkConditionalRenderingBeginInfo2EXT). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-buffer-commands) for more information. |
| --- | --- |

// Provided by VK_EXT_conditional_rendering
typedef struct VkConditionalRenderingBeginInfoEXT {
    VkStructureType                   sType;
    const void*                       pNext;
    VkBuffer                          buffer;
    VkDeviceSize                      offset;
    VkConditionalRenderingFlagsEXT    flags;
} VkConditionalRenderingBeginInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is a buffer containing the predicate for conditional
rendering.

* 
`offset` is the byte offset into `buffer` where the predicate is
located.

* 
`flags` is a bitmask of [VkConditionalRenderingFlagsEXT](VkConditionalRenderingFlagsEXT.html)
specifying the behavior of conditional rendering.

If the 32-bit value at `offset` in `buffer` memory is zero, then the
rendering commands are discarded, otherwise they are executed as normal.
If the value of the predicate in buffer memory changes while conditional
rendering is active, the rendering commands **may** be discarded in an
implementation-dependent way.
Some implementations may latch the value of the predicate upon beginning
conditional rendering while others may read it before every rendering
command.

Valid Usage

* 
[](#VUID-VkConditionalRenderingBeginInfoEXT-buffer-01981) VUID-VkConditionalRenderingBeginInfoEXT-buffer-01981

If `buffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkConditionalRenderingBeginInfoEXT-buffer-01982) VUID-VkConditionalRenderingBeginInfoEXT-buffer-01982

`buffer` **must** have been created with the
[VK_BUFFER_USAGE_CONDITIONAL_RENDERING_BIT_EXT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkConditionalRenderingBeginInfoEXT-offset-01983) VUID-VkConditionalRenderingBeginInfoEXT-offset-01983

`offset` **must** be less than the size of `buffer` by at least 32
bits

* 
[](#VUID-VkConditionalRenderingBeginInfoEXT-offset-01984) VUID-VkConditionalRenderingBeginInfoEXT-offset-01984

`offset` **must** be a multiple of 4

Valid Usage (Implicit)

* 
[](#VUID-VkConditionalRenderingBeginInfoEXT-sType-sType) VUID-VkConditionalRenderingBeginInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CONDITIONAL_RENDERING_BEGIN_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkConditionalRenderingBeginInfoEXT-pNext-pNext) VUID-VkConditionalRenderingBeginInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkConditionalRenderingBeginInfoEXT-buffer-parameter) VUID-VkConditionalRenderingBeginInfoEXT-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkConditionalRenderingBeginInfoEXT-flags-parameter) VUID-VkConditionalRenderingBeginInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkConditionalRenderingFlagBitsEXT](VkConditionalRenderingFlagBitsEXT.html) values

[VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html), [VkBuffer](VkBuffer.html), [VkConditionalRenderingFlagsEXT](VkConditionalRenderingFlagsEXT.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkCmdBeginConditionalRenderingEXT](vkCmdBeginConditionalRenderingEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkConditionalRenderingBeginInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
