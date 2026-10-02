# vkGetBufferDeviceAddress(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetBufferDeviceAddress.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetBufferDeviceAddress - Query an address of a buffer

To query a 64-bit buffer device address value which can be used to identify
a buffer to API commands or through which buffer memory **can** be accessed,
call:

// Provided by VK_VERSION_1_2
VkDeviceAddress vkGetBufferDeviceAddress(
    VkDevice                                    device,
    const VkBufferDeviceAddressInfo*            pInfo);

// Provided by VK_KHR_buffer_device_address
// Equivalent to vkGetBufferDeviceAddress
VkDeviceAddress vkGetBufferDeviceAddressKHR(
    VkDevice                                    device,
    const VkBufferDeviceAddressInfo*            pInfo);

// Provided by VK_EXT_buffer_device_address
// Equivalent to vkGetBufferDeviceAddress
VkDeviceAddress vkGetBufferDeviceAddressEXT(
    VkDevice                                    device,
    const VkBufferDeviceAddressInfo*            pInfo);

* 
`device` is the logical device that the buffer was created on.

* 
`pInfo` is a pointer to a [VkBufferDeviceAddressInfo](VkBufferDeviceAddressInfo.html) structure
specifying the buffer to retrieve an address for.

The 64-bit return value, `bufferBaseAddress`, is an address of the
start of `pInfo->buffer`.
Addresses in the range [`bufferBaseAddress`, `bufferBaseAddress`
+  [VkBufferCreateInfo](VkBufferCreateInfo.html)::`size`) **can** be used to access the
memory bound to this buffer on the device.

A value of zero is reserved as a “null” pointer and **must** not be returned
as a valid buffer device address.

If the buffer was created with a non-zero value of
[VkBufferOpaqueCaptureAddressCreateInfo](VkBufferOpaqueCaptureAddressCreateInfo.html)::`opaqueCaptureAddress` or
[VkBufferDeviceAddressCreateInfoEXT](VkBufferDeviceAddressCreateInfoEXT.html)::`deviceAddress`,
the return value will be the same address that was returned at capture time.

The returned address **must** satisfy alignment requirements if certain
conditions are met, outlined below.
The required alignment **must** be observed for either the returned address of
the buffer, or, if the buffer was created without
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html), the returned address of the
buffer minus [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html)::`memoryOffset` or equivalent
[vkBindBufferMemory](vkBindBufferMemory.html) offset.
The required alignment is the maximum of the following values:

* 
The value of [VkMemoryRequirements](VkMemoryRequirements.html)::`alignment` queried via
[vkGetBufferMemoryRequirements](vkGetBufferMemoryRequirements.html) for `pInfo->buffer`

* 
[`minStorageBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minStorageBufferOffsetAlignment)
if `pInfo->buffer` was created with
[VK_BUFFER_USAGE_2_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits2.html)

* 
[`minUniformBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minUniformBufferOffsetAlignment)
if `pInfo->buffer` was created with
[VK_BUFFER_USAGE_2_UNIFORM_BUFFER_BIT](VkBufferUsageFlagBits2.html)

* 
[`minTexelBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minTexelBufferOffsetAlignment)
if `pInfo->buffer` was created with
[VK_BUFFER_USAGE_2_STORAGE_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits2.html) or
[VK_BUFFER_USAGE_2_UNIFORM_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits2.html)

* 
[`resourceHeapAlignment`](../../../../spec/latest/chapters/limits.html#limits-resourceHeapAlignment) if
`pInfo->buffer` was created with
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits2.html)

* 
[`samplerHeapAlignment`](../../../../spec/latest/chapters/limits.html#limits-samplerHeapAlignment) if
`pInfo->buffer` was created with
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits2.html)

* 
[`descriptorBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-descriptorBufferOffsetAlignment)
if `pInfo->buffer` was created with
[VK_BUFFER_USAGE_2_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits2.html) or
[VK_BUFFER_USAGE_2_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits2.html)

* 
[VkBufferDeviceAddressAlignmentAllocateInfoVALVE](VkBufferDeviceAddressAlignmentAllocateInfoVALVE.html)::`alignment`
if `pInfo->buffer` was created without
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html) and the bound
[VkDeviceMemory](VkDeviceMemory.html) was created with specified non-zero alignment of
[VkBufferDeviceAddressAlignmentAllocateInfoVALVE](VkBufferDeviceAddressAlignmentAllocateInfoVALVE.html)::`alignment`

* 
[VkBufferDeviceAddressAlignmentAllocateInfoVALVE](VkBufferDeviceAddressAlignmentAllocateInfoVALVE.html)::`alignment`
if `pInfo->buffer` was created with
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html), and the buffer was created
with non-zero
[VkBufferDeviceAddressAlignmentAllocateInfoVALVE](VkBufferDeviceAddressAlignmentAllocateInfoVALVE.html)::`alignment`

* 
256, if `pInfo->buffer` was created with
[VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](VkBufferUsageFlagBits2.html), and
`[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html)` is supported

If multiple [VkBuffer](VkBuffer.html) objects are bound to overlapping ranges of
[VkDeviceMemory](VkDeviceMemory.html), implementations **may** return address ranges which
overlap.
In this case, it is ambiguous which [VkBuffer](VkBuffer.html) is associated with any
given device address.
For purposes of valid usage, if multiple [VkBuffer](VkBuffer.html) objects **can** be
attributed to a device address, a [VkBuffer](VkBuffer.html) is selected such that valid
usage passes, if it exists.

Valid Usage

* 
[](#VUID-vkGetBufferDeviceAddress-bufferDeviceAddress-03324) VUID-vkGetBufferDeviceAddress-bufferDeviceAddress-03324

The [`bufferDeviceAddress`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddress) feature
or the [](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressEXT)[VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](VkPhysicalDeviceBufferDeviceAddressFeaturesEXT.html)::`bufferDeviceAddress`
feature
**must** be enabled, and at least one of the following conditions **must** be
met

`buffer` is sparse

* 
`buffer` is bound completely and contiguously to a single
`VkDeviceMemory` object

* 
`buffer` was created with the
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html) flag and the
[](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressEXT)[VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](VkPhysicalDeviceBufferDeviceAddressFeaturesEXT.html)::`bufferDeviceAddress`
feature is enabled on the device

[](#VUID-vkGetBufferDeviceAddress-device-03325) VUID-vkGetBufferDeviceAddress-device-03325

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice)
or [](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDeviceEXT)[VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](VkPhysicalDeviceBufferDeviceAddressFeaturesEXT.html)::`bufferDeviceAddressMultiDevice`
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferDeviceAddress-device-parameter) VUID-vkGetBufferDeviceAddress-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetBufferDeviceAddress-pInfo-parameter) VUID-vkGetBufferDeviceAddress-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkBufferDeviceAddressInfo](VkBufferDeviceAddressInfo.html) structure

[VK_EXT_buffer_device_address](VK_EXT_buffer_device_address.html), [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkBufferDeviceAddressInfo](VkBufferDeviceAddressInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetBufferDeviceAddress).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
