# vkCopyMemoryToMicromapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCopyMemoryToMicromapEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCopyMemoryToMicromapEXT - Deserialize a micromap on the host

To copy host accessible memory to a micromap, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkCopyMemoryToMicromapEXT(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyMemoryToMicromapInfoEXT*        pInfo);

* 
`device` is the device which owns `pInfo->dst`.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](VkDeferredOperationKHR.html) to
[request deferral](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a [VkCopyMemoryToMicromapInfoEXT](VkCopyMemoryToMicromapInfoEXT.html)
structure defining the copy operation.

This command fulfills the same task as [vkCmdCopyMemoryToMicromapEXT](vkCmdCopyMemoryToMicromapEXT.html)
but is executed by the host.

This command can accept micromaps produced by either
[vkCmdCopyMicromapToMemoryEXT](vkCmdCopyMicromapToMemoryEXT.html) or [vkCopyMicromapToMemoryEXT](vkCopyMicromapToMemoryEXT.html).

Valid Usage

* 
[](#VUID-vkCopyMemoryToMicromapEXT-deferredOperation-03678) VUID-vkCopyMemoryToMicromapEXT-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyMemoryToMicromapEXT-pInfo-07563) VUID-vkCopyMemoryToMicromapEXT-pInfo-07563

`pInfo->src.hostAddress` **must** be a valid host pointer

* 
[](#VUID-vkCopyMemoryToMicromapEXT-pInfo-07564) VUID-vkCopyMemoryToMicromapEXT-pInfo-07564

`pInfo->src.hostAddress` **must** be aligned to 16 bytes

* 
[](#VUID-vkCopyMemoryToMicromapEXT-buffer-07565) VUID-vkCopyMemoryToMicromapEXT-buffer-07565

The `buffer` used to create `pInfo->dst` **must** be bound to
host-visible device memory

* 
[](#VUID-vkCopyMemoryToMicromapEXT-micromapHostCommands-07566) VUID-vkCopyMemoryToMicromapEXT-micromapHostCommands-07566

The [    `VkPhysicalDeviceOpacityMicromapFeaturesEXT`::`micromapHostCommands`](../../../../spec/latest/chapters/features.html#features-micromapHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyMemoryToMicromapEXT-buffer-07567) VUID-vkCopyMemoryToMicromapEXT-buffer-07567

The `buffer` used to create `pInfo->dst` **must** be bound to
memory that was not allocated with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkCopyMemoryToMicromapEXT-device-parameter) VUID-vkCopyMemoryToMicromapEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCopyMemoryToMicromapEXT-deferredOperation-parameter) VUID-vkCopyMemoryToMicromapEXT-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkCopyMemoryToMicromapEXT-pInfo-parameter) VUID-vkCopyMemoryToMicromapEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMemoryToMicromapInfoEXT](VkCopyMemoryToMicromapInfoEXT.html) structure

* 
[](#VUID-vkCopyMemoryToMicromapEXT-deferredOperation-parent) VUID-vkCopyMemoryToMicromapEXT-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](VkResult.html)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCopyMemoryToMicromapInfoEXT](VkCopyMemoryToMicromapInfoEXT.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#vkCopyMemoryToMicromapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
