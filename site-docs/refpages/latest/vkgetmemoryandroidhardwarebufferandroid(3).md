# vkGetMemoryAndroidHardwareBufferANDROID(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryAndroidHardwareBufferANDROID.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryAndroidHardwareBufferANDROID - Get an Android hardware buffer for a memory object

To export an Android hardware buffer referencing the payload of a Vulkan
device memory object, call:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
VkResult vkGetMemoryAndroidHardwareBufferANDROID(
    VkDevice                                    device,
    const VkMemoryGetAndroidHardwareBufferInfoANDROID* pInfo,
    struct AHardwareBuffer**                    pBuffer);

* 
`device` is the logical device that created the device memory being
exported.

* 
`pInfo` is a pointer to a
[VkMemoryGetAndroidHardwareBufferInfoANDROID](VkMemoryGetAndroidHardwareBufferInfoANDROID.html) structure containing
parameters of the export operation.

* 
`pBuffer` will return an Android hardware buffer referencing the
payload of the device memory object.

Each call to `vkGetMemoryAndroidHardwareBufferANDROID` **must** return an
Android hardware buffer with a new reference acquired in addition to the
reference held by the [VkDeviceMemory](VkDeviceMemory.html).
To avoid leaking resources, the application **must** release the reference by
calling `AHardwareBuffer_release` when it is no longer needed.
When called with the same handle in
[VkMemoryGetAndroidHardwareBufferInfoANDROID](VkMemoryGetAndroidHardwareBufferInfoANDROID.html)::`memory`,
`vkGetMemoryAndroidHardwareBufferANDROID` **must** return the same Android
hardware buffer object.
If the device memory was created by importing an Android hardware buffer,
`vkGetMemoryAndroidHardwareBufferANDROID` **must** return that same Android
hardware buffer object.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryAndroidHardwareBufferANDROID-device-parameter) VUID-vkGetMemoryAndroidHardwareBufferANDROID-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryAndroidHardwareBufferANDROID-pInfo-parameter) VUID-vkGetMemoryAndroidHardwareBufferANDROID-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkMemoryGetAndroidHardwareBufferInfoANDROID](VkMemoryGetAndroidHardwareBufferInfoANDROID.html) structure

* 
[](#VUID-vkGetMemoryAndroidHardwareBufferANDROID-pBuffer-parameter) VUID-vkGetMemoryAndroidHardwareBufferANDROID-pBuffer-parameter

 `pBuffer` **must** be a valid pointer to a valid pointer to an `AHardwareBuffer` value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_ANDROID_external_memory_android_hardware_buffer](VK_ANDROID_external_memory_android_hardware_buffer.html), [VkDevice](VkDevice.html), [VkMemoryGetAndroidHardwareBufferInfoANDROID](VkMemoryGetAndroidHardwareBufferInfoANDROID.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryAndroidHardwareBufferANDROID).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
