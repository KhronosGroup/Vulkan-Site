# vkCopyMicromapToMemoryEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCopyMicromapToMemoryEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCopyMicromapToMemoryEXT - Serialize a micromap on the host

To copy a micromap to host accessible memory, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkCopyMicromapToMemoryEXT(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyMicromapToMemoryInfoEXT*        pInfo);

* 
`device` is the device which owns `pInfo->src`.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](VkDeferredOperationKHR.html) to
[request deferral](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a [VkCopyMicromapToMemoryInfoEXT](VkCopyMicromapToMemoryInfoEXT.html)
structure defining the copy operation.

This command fulfills the same task as [vkCmdCopyMicromapToMemoryEXT](vkCmdCopyMicromapToMemoryEXT.html)
but is executed by the host.

This command produces the same results as
[vkCmdCopyMicromapToMemoryEXT](vkCmdCopyMicromapToMemoryEXT.html), but writes its result directly to a host
pointer, and is executed on the host rather than the device.
The output **may** not necessarily be bit-for-bit identical, but it can be
equally used by either [vkCmdCopyMemoryToMicromapEXT](vkCmdCopyMemoryToMicromapEXT.html) or
[vkCopyMemoryToMicromapEXT](vkCopyMemoryToMicromapEXT.html).

Valid Usage

* 
[](#VUID-vkCopyMicromapToMemoryEXT-deferredOperation-03678) VUID-vkCopyMicromapToMemoryEXT-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyMicromapToMemoryEXT-buffer-07568) VUID-vkCopyMicromapToMemoryEXT-buffer-07568

The `buffer` used to create `pInfo->src` **must** be bound to
host-visible device memory

* 
[](#VUID-vkCopyMicromapToMemoryEXT-pInfo-07569) VUID-vkCopyMicromapToMemoryEXT-pInfo-07569

`pInfo->dst.hostAddress` **must** be a valid host pointer

* 
[](#VUID-vkCopyMicromapToMemoryEXT-pInfo-07570) VUID-vkCopyMicromapToMemoryEXT-pInfo-07570

`pInfo->dst.hostAddress` **must** be aligned to 16 bytes

* 
[](#VUID-vkCopyMicromapToMemoryEXT-micromapHostCommands-07571) VUID-vkCopyMicromapToMemoryEXT-micromapHostCommands-07571

The [    `VkPhysicalDeviceOpacityMicromapFeaturesEXT`::`micromapHostCommands`](../../../../spec/latest/chapters/features.html#features-micromapHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyMicromapToMemoryEXT-buffer-07572) VUID-vkCopyMicromapToMemoryEXT-buffer-07572

The `buffer` used to create `pInfo->src` **must** be bound to
memory that was not allocated with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkCopyMicromapToMemoryEXT-device-parameter) VUID-vkCopyMicromapToMemoryEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCopyMicromapToMemoryEXT-deferredOperation-parameter) VUID-vkCopyMicromapToMemoryEXT-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkCopyMicromapToMemoryEXT-pInfo-parameter) VUID-vkCopyMicromapToMemoryEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMicromapToMemoryInfoEXT](VkCopyMicromapToMemoryInfoEXT.html) structure

* 
[](#VUID-vkCopyMicromapToMemoryEXT-deferredOperation-parent) VUID-vkCopyMicromapToMemoryEXT-deferredOperation-parent

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

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCopyMicromapToMemoryInfoEXT](VkCopyMicromapToMemoryInfoEXT.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#vkCopyMicromapToMemoryEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
