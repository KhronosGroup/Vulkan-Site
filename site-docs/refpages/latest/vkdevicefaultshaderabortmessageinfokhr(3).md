# VkDeviceFaultShaderAbortMessageInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceFaultShaderAbortMessageInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceFaultShaderAbortMessageInfoKHR - Structure specifying message data from `OpAbortKHR`

The `VkDeviceFaultShaderAbortMessageInfoKHR` structure is defined as:

// Provided by VK_KHR_shader_abort
typedef struct VkDeviceFaultShaderAbortMessageInfoKHR {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           messageDataSize;
    void*              pMessageData;
} VkDeviceFaultShaderAbortMessageInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`messageDataSize` is the size of `pMessageData` in bytes.
If `pMessageData` is `NULL`, this value is populated by the
implementation.

* 
`pMessageData` is `NULL` or a pointer to `messageDataSize` bytes
of data, which will be populated with data for messages reported via
`OpAbortKHR`.
If `pMessageData` is `NULL` then `messageDataSize` will be populated
with the required size.

This structure **can** be included in the `pNext` chain of
[VkDeviceFaultDebugInfoKHR](VkDeviceFaultDebugInfoKHR.html) to retrieve messages returned by
`OpAbortKHR` instructions.

`pMessageData` is populated with a series of (size,payload) pairs,
each aligned to 8-byte boundaries.
The size in each pair is a 64-bit integer indicating the number of
bytes in the subsequent payload.
The data in payload is laid out in the exact manner specified in the
`OpAbortKHR` instruction by the message type, with no modifications.
If multiple messages are present, the next message size will always be at
the following 8-byte aligned offset after the payload ends.

Implementations **must** report the message reported by the first
`OpAbortKHR` instruction executed in an invocation for this device.
They **may** report additional messages if other invocations continued to
execute after the abort instruction was executed.

|  | Even though shading languages may provide definitions for printf-style abort
| --- | --- |
commands, no formatting is performed by the Vulkan implementation.
Applications should consult documentation for the shader language they are
using on how abort messages are packed, so that they can unpack them after
they are queried. |

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceFaultShaderAbortMessageInfoKHR-sType-sType) VUID-VkDeviceFaultShaderAbortMessageInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_FAULT_SHADER_ABORT_MESSAGE_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceFaultDebugInfoKHR](VkDeviceFaultDebugInfoKHR.html)

[VK_KHR_shader_abort](VK_KHR_shader_abort.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDeviceFaultShaderAbortMessageInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
