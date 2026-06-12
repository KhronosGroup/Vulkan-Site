# vkCopyMemoryToAccelerationStructureKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCopyMemoryToAccelerationStructureKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCopyMemoryToAccelerationStructureKHR - Deserialize an acceleration structure on the host

To copy host accessible memory to an acceleration structure, call:

// Provided by VK_KHR_acceleration_structure
VkResult vkCopyMemoryToAccelerationStructureKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyMemoryToAccelerationStructureInfoKHR* pInfo);

* 
`device` is the device which owns `pInfo->dst`.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](VkDeferredOperationKHR.html) to
[request deferral](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a
[VkCopyMemoryToAccelerationStructureInfoKHR](VkCopyMemoryToAccelerationStructureInfoKHR.html) structure defining the
copy operation.

This command fulfills the same task as
[vkCmdCopyMemoryToAccelerationStructureKHR](vkCmdCopyMemoryToAccelerationStructureKHR.html) but is executed by the host.

This command can accept acceleration structures produced by either
[vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html) or
[vkCopyAccelerationStructureToMemoryKHR](vkCopyAccelerationStructureToMemoryKHR.html).

Valid Usage

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-accelerationStructureHostCommands-03583) VUID-vkCopyMemoryToAccelerationStructureKHR-accelerationStructureHostCommands-03583

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureHostCommands`](../../../../spec/latest/chapters/features.html#features-accelerationStructureHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-03678) VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-03729) VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-03729

`pInfo->src.hostAddress` **must** be a valid host pointer

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-03750) VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-03750

`pInfo->src.hostAddress` **must** be aligned to 16 bytes

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-buffer-03730) VUID-vkCopyMemoryToAccelerationStructureKHR-buffer-03730

`pInfo->dst` **must** be bound to host-visible device memory

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-buffer-03782) VUID-vkCopyMemoryToAccelerationStructureKHR-buffer-03782

`pInfo->dst` **must** be bound to memory that was not allocated with
multiple instances

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-dst-11677) VUID-vkCopyMemoryToAccelerationStructureKHR-dst-11677

`pInfo->dst` **must** have been created with
[vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-device-parameter) VUID-vkCopyMemoryToAccelerationStructureKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-parameter) VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-parameter) VUID-vkCopyMemoryToAccelerationStructureKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMemoryToAccelerationStructureInfoKHR](VkCopyMemoryToAccelerationStructureInfoKHR.html) structure

* 
[](#VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-parent) VUID-vkCopyMemoryToAccelerationStructureKHR-deferredOperation-parent

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

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkCopyMemoryToAccelerationStructureInfoKHR](VkCopyMemoryToAccelerationStructureInfoKHR.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCopyMemoryToAccelerationStructureKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
