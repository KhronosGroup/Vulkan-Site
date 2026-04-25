# vkCopyAccelerationStructureKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCopyAccelerationStructureKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCopyAccelerationStructureKHR - Copy an acceleration structure on the host

To copy or compact an acceleration structure on the host, call:

// Provided by VK_KHR_acceleration_structure
VkResult vkCopyAccelerationStructureKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyAccelerationStructureInfoKHR*   pInfo);

* 
`device` is the device which owns the acceleration structures.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](VkDeferredOperationKHR.html) to
[request deferral](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a [VkCopyAccelerationStructureInfoKHR](VkCopyAccelerationStructureInfoKHR.html)
structure defining the copy operation.

This command fulfills the same task as
[vkCmdCopyAccelerationStructureKHR](vkCmdCopyAccelerationStructureKHR.html) but is executed by the host.

Valid Usage

* 
[](#VUID-vkCopyAccelerationStructureKHR-accelerationStructureHostCommands-03582) VUID-vkCopyAccelerationStructureKHR-accelerationStructureHostCommands-03582

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureHostCommands`](../../../../spec/latest/chapters/features.html#features-accelerationStructureHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyAccelerationStructureKHR-deferredOperation-03678) VUID-vkCopyAccelerationStructureKHR-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyAccelerationStructureKHR-buffer-03727) VUID-vkCopyAccelerationStructureKHR-buffer-03727

`pInfo->src` **must** be bound to host-visible device memory

* 
[](#VUID-vkCopyAccelerationStructureKHR-buffer-03728) VUID-vkCopyAccelerationStructureKHR-buffer-03728

`pInfo->dst` **must** be bound to host-visible device memory

* 
[](#VUID-vkCopyAccelerationStructureKHR-buffer-03780) VUID-vkCopyAccelerationStructureKHR-buffer-03780

`pInfo->src` **must** be bound to memory that was not allocated with
multiple instances

* 
[](#VUID-vkCopyAccelerationStructureKHR-buffer-03781) VUID-vkCopyAccelerationStructureKHR-buffer-03781

`pInfo->dst` **must** be bound to memory that was not allocated with
multiple instances

* 
[](#VUID-vkCopyAccelerationStructureKHR-src-11588) VUID-vkCopyAccelerationStructureKHR-src-11588

`pInfo->src` **must** have been created with
[vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html)

* 
[](#VUID-vkCopyAccelerationStructureKHR-dst-11589) VUID-vkCopyAccelerationStructureKHR-dst-11589

`pInfo->dst` **must** have been created with
[vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCopyAccelerationStructureKHR-device-parameter) VUID-vkCopyAccelerationStructureKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCopyAccelerationStructureKHR-deferredOperation-parameter) VUID-vkCopyAccelerationStructureKHR-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkCopyAccelerationStructureKHR-pInfo-parameter) VUID-vkCopyAccelerationStructureKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyAccelerationStructureInfoKHR](VkCopyAccelerationStructureInfoKHR.html) structure

* 
[](#VUID-vkCopyAccelerationStructureKHR-deferredOperation-parent) VUID-vkCopyAccelerationStructureKHR-deferredOperation-parent

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

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkCopyAccelerationStructureInfoKHR](VkCopyAccelerationStructureInfoKHR.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCopyAccelerationStructureKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
