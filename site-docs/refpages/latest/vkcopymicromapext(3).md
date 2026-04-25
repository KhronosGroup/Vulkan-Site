# vkCopyMicromapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCopyMicromapEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCopyMicromapEXT - Copy a micromap on the host

To copy or compact a micromap on the host, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkCopyMicromapEXT(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyMicromapInfoEXT*                pInfo);

* 
`device` is the device which owns the micromaps.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](VkDeferredOperationKHR.html) to
[request deferral](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a [VkCopyMicromapInfoEXT](VkCopyMicromapInfoEXT.html) structure
defining the copy operation.

This command fulfills the same task as [vkCmdCopyMicromapEXT](vkCmdCopyMicromapEXT.html) but is
executed by the host.

Valid Usage

* 
[](#VUID-vkCopyMicromapEXT-deferredOperation-03678) VUID-vkCopyMicromapEXT-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyMicromapEXT-buffer-07558) VUID-vkCopyMicromapEXT-buffer-07558

The `buffer` used to create `pInfo->src` **must** be bound to
host-visible device memory

* 
[](#VUID-vkCopyMicromapEXT-buffer-07559) VUID-vkCopyMicromapEXT-buffer-07559

The `buffer` used to create `pInfo->dst` **must** be bound to
host-visible device memory

* 
[](#VUID-vkCopyMicromapEXT-micromapHostCommands-07560) VUID-vkCopyMicromapEXT-micromapHostCommands-07560

The [    `VkPhysicalDeviceOpacityMicromapFeaturesEXT`::`micromapHostCommands`](../../../../spec/latest/chapters/features.html#features-micromapHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyMicromapEXT-buffer-07561) VUID-vkCopyMicromapEXT-buffer-07561

The `buffer` used to create `pInfo->src` **must** be bound to
memory that was not allocated with multiple instances

* 
[](#VUID-vkCopyMicromapEXT-buffer-07562) VUID-vkCopyMicromapEXT-buffer-07562

The `buffer` used to create `pInfo->dst` **must** be bound to
memory that was not allocated with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkCopyMicromapEXT-device-parameter) VUID-vkCopyMicromapEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCopyMicromapEXT-deferredOperation-parameter) VUID-vkCopyMicromapEXT-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkCopyMicromapEXT-pInfo-parameter) VUID-vkCopyMicromapEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMicromapInfoEXT](VkCopyMicromapInfoEXT.html) structure

* 
[](#VUID-vkCopyMicromapEXT-deferredOperation-parent) VUID-vkCopyMicromapEXT-deferredOperation-parent

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

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCopyMicromapInfoEXT](VkCopyMicromapInfoEXT.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#vkCopyMicromapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
