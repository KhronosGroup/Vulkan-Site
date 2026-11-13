# VkBufferOpaqueCaptureAddressCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferOpaqueCaptureAddressCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferOpaqueCaptureAddressCreateInfo - Request a specific address for a buffer

To request a specific device address for a buffer, add a
[VkBufferOpaqueCaptureAddressCreateInfo](#) structure to the `pNext`
chain of the [VkBufferCreateInfo](VkBufferCreateInfo.html) structure.
The `VkBufferOpaqueCaptureAddressCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkBufferOpaqueCaptureAddressCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           opaqueCaptureAddress;
} VkBufferOpaqueCaptureAddressCreateInfo;

// Provided by VK_KHR_buffer_device_address
// Equivalent to VkBufferOpaqueCaptureAddressCreateInfo
typedef VkBufferOpaqueCaptureAddressCreateInfo VkBufferOpaqueCaptureAddressCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`opaqueCaptureAddress` is the opaque capture address requested for
the buffer.

If `opaqueCaptureAddress` is zero, no specific address is requested.

If `opaqueCaptureAddress` is not zero, then it **should** be an address
retrieved from [vkGetBufferOpaqueCaptureAddress](vkGetBufferOpaqueCaptureAddress.html) for an identically
created buffer on the same implementation.

If this structure is not present, it is as if `opaqueCaptureAddress` is
zero.

Applications **should** avoid creating buffers with application-provided
addresses and implementation-provided addresses in the same process, to
reduce the likelihood of [VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](VkResult.html)
errors.

|  | The expected usage for this is that a trace capture/replay tool will add the
| --- | --- |
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html) flag to all buffers
that use [VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html), and during capture
will save the queried opaque device addresses in the trace.
During replay, the buffers will be created specifying the original address
so any address values stored in the trace data will remain valid.

Implementations are expected to separate such buffers in the GPU address
space so normal allocations will avoid using these addresses.
Applications and tools should avoid mixing application-provided and
implementation-provided addresses for buffers created with
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html), to avoid address
space allocation conflicts. |

Valid Usage (Implicit)

* 
[](#VUID-VkBufferOpaqueCaptureAddressCreateInfo-sType-sType) VUID-VkBufferOpaqueCaptureAddressCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_OPAQUE_CAPTURE_ADDRESS_CREATE_INFO](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](VkBufferCreateInfo.html)

[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferOpaqueCaptureAddressCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
