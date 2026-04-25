# vkGetMemoryRemoteAddressNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryRemoteAddressNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryRemoteAddressNV - Get an address for a memory object accessible by remote devices

To export an address representing the payload of a Vulkan device memory
object accessible by remote devices, call:

// Provided by VK_NV_external_memory_rdma
VkResult vkGetMemoryRemoteAddressNV(
    VkDevice                                    device,
    const VkMemoryGetRemoteAddressInfoNV*       pMemoryGetRemoteAddressInfo,
    VkRemoteAddressNV*                          pAddress);

* 
`device` is the logical device that created the device memory being
exported.

* 
`pMemoryGetRemoteAddressInfo` is a pointer to a
[VkMemoryGetRemoteAddressInfoNV](VkMemoryGetRemoteAddressInfoNV.html) structure containing parameters of
the export operation.

* 
`pAddress` is a pointer to a `VkRemoteAddressNV` value in
which an address representing the payload of the device memory object is
returned.

More communication may be required between the kernel-mode drivers of the
devices involved.
This information is out of scope of this documentation and should be
requested from the vendors of the devices.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryRemoteAddressNV-device-parameter) VUID-vkGetMemoryRemoteAddressNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryRemoteAddressNV-pMemoryGetRemoteAddressInfo-parameter) VUID-vkGetMemoryRemoteAddressNV-pMemoryGetRemoteAddressInfo-parameter

 `pMemoryGetRemoteAddressInfo` **must** be a valid pointer to a valid [VkMemoryGetRemoteAddressInfoNV](VkMemoryGetRemoteAddressInfoNV.html) structure

* 
[](#VUID-vkGetMemoryRemoteAddressNV-pAddress-parameter) VUID-vkGetMemoryRemoteAddressNV-pAddress-parameter

 `pAddress` **must** be a valid pointer to a `VkRemoteAddressNV` value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_external_memory_rdma](VK_NV_external_memory_rdma.html), [VkDevice](VkDevice.html), [VkMemoryGetRemoteAddressInfoNV](VkMemoryGetRemoteAddressInfoNV.html), `VkRemoteAddressNV`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryRemoteAddressNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
