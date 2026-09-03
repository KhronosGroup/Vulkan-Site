# vkGetBufferOpaqueCaptureAddress(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetBufferOpaqueCaptureAddress.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetBufferOpaqueCaptureAddress - Query an opaque capture address of a buffer

To query a 64-bit buffer opaque capture address, call:

// Provided by VK_VERSION_1_2
uint64_t vkGetBufferOpaqueCaptureAddress(
    VkDevice                                    device,
    const VkBufferDeviceAddressInfo*            pInfo);

// Provided by VK_KHR_buffer_device_address
// Equivalent to vkGetBufferOpaqueCaptureAddress
uint64_t vkGetBufferOpaqueCaptureAddressKHR(
    VkDevice                                    device,
    const VkBufferDeviceAddressInfo*            pInfo);

* 
`device` is the logical device that the buffer was created on.

* 
`pInfo` is a pointer to a [VkBufferDeviceAddressInfo](VkBufferDeviceAddressInfo.html) structure
specifying the buffer to retrieve an address for.

The 64-bit return value is an opaque capture address of the start of
`pInfo->buffer`.

If the buffer was created with a non-zero value of
[VkBufferOpaqueCaptureAddressCreateInfo](VkBufferOpaqueCaptureAddressCreateInfo.html)::`opaqueCaptureAddress` the
return value **must** be the same address.

Valid Usage

* 
[](#VUID-vkGetBufferOpaqueCaptureAddress-None-03326) VUID-vkGetBufferOpaqueCaptureAddress-None-03326

The [`bufferDeviceAddress`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddress) and
[    `bufferDeviceAddressCaptureReplay`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressCaptureReplay) features **must** be enabled

* 
[](#VUID-vkGetBufferOpaqueCaptureAddress-pInfo-10725) VUID-vkGetBufferOpaqueCaptureAddress-pInfo-10725

`pInfo->buffer` **must** have been created with the
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html) flag

* 
[](#VUID-vkGetBufferOpaqueCaptureAddress-device-03327) VUID-vkGetBufferOpaqueCaptureAddress-device-03327

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferOpaqueCaptureAddress-device-parameter) VUID-vkGetBufferOpaqueCaptureAddress-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetBufferOpaqueCaptureAddress-pInfo-parameter) VUID-vkGetBufferOpaqueCaptureAddress-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkBufferDeviceAddressInfo](VkBufferDeviceAddressInfo.html) structure

[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkBufferDeviceAddressInfo](VkBufferDeviceAddressInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetBufferOpaqueCaptureAddress).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
