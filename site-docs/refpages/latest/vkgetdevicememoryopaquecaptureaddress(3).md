# vkGetDeviceMemoryOpaqueCaptureAddress(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceMemoryOpaqueCaptureAddress.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceMemoryOpaqueCaptureAddress - Query an opaque capture address of a memory object

To query a 64-bit opaque capture address value from a memory object, call:

// Provided by VK_VERSION_1_2
uint64_t vkGetDeviceMemoryOpaqueCaptureAddress(
    VkDevice                                    device,
    const VkDeviceMemoryOpaqueCaptureAddressInfo* pInfo);

// Provided by VK_KHR_buffer_device_address
// Equivalent to vkGetDeviceMemoryOpaqueCaptureAddress
uint64_t vkGetDeviceMemoryOpaqueCaptureAddressKHR(
    VkDevice                                    device,
    const VkDeviceMemoryOpaqueCaptureAddressInfo* pInfo);

* 
`device` is the logical device that the memory object was allocated
on.

* 
`pInfo` is a pointer to a
[VkDeviceMemoryOpaqueCaptureAddressInfo](VkDeviceMemoryOpaqueCaptureAddressInfo.html) structure specifying the
memory object to retrieve an address for.

The 64-bit return value is an opaque address representing the start of
`pInfo->memory`.

If the memory object was allocated with a non-zero value of
[VkMemoryOpaqueCaptureAddressAllocateInfo](VkMemoryOpaqueCaptureAddressAllocateInfo.html)::`opaqueCaptureAddress`,
the return value **must** be the same address.

|  | The expected usage for these opaque addresses is only for trace
| --- | --- |
capture/replay tools to store these addresses in a trace and subsequently
specify them during replay. |

Valid Usage

* 
[](#VUID-vkGetDeviceMemoryOpaqueCaptureAddress-None-03334) VUID-vkGetDeviceMemoryOpaqueCaptureAddress-None-03334

The [`bufferDeviceAddress`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddress) and
[    `bufferDeviceAddressCaptureReplay`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressCaptureReplay) features **must** be enabled

* 
[](#VUID-vkGetDeviceMemoryOpaqueCaptureAddress-pInfo-10727) VUID-vkGetDeviceMemoryOpaqueCaptureAddress-pInfo-10727

`pInfo->memory` **must** have been allocated using the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkMemoryAllocateFlagBits.html) flag

* 
[](#VUID-vkGetDeviceMemoryOpaqueCaptureAddress-device-03335) VUID-vkGetDeviceMemoryOpaqueCaptureAddress-device-03335

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceMemoryOpaqueCaptureAddress-device-parameter) VUID-vkGetDeviceMemoryOpaqueCaptureAddress-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceMemoryOpaqueCaptureAddress-pInfo-parameter) VUID-vkGetDeviceMemoryOpaqueCaptureAddress-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceMemoryOpaqueCaptureAddressInfo](VkDeviceMemoryOpaqueCaptureAddressInfo.html) structure

[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkDevice](VkDevice.html), [VkDeviceMemoryOpaqueCaptureAddressInfo](VkDeviceMemoryOpaqueCaptureAddressInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetDeviceMemoryOpaqueCaptureAddress).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
