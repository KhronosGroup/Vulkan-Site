# vkCopyAccelerationStructureToMemoryKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCopyAccelerationStructureToMemoryKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCopyAccelerationStructureToMemoryKHR - Serialize an acceleration structure on the host

To copy an acceleration structure to host accessible memory, call:

// Provided by VK_KHR_acceleration_structure
VkResult vkCopyAccelerationStructureToMemoryKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    const VkCopyAccelerationStructureToMemoryInfoKHR* pInfo);

* 
`device` is the device which owns `pInfo->src`.

* 
`deferredOperation` is an optional [VkDeferredOperationKHR](VkDeferredOperationKHR.html) to
[request deferral](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) for this
command.

* 
`pInfo` is a pointer to a
[VkCopyAccelerationStructureToMemoryInfoKHR](VkCopyAccelerationStructureToMemoryInfoKHR.html) structure defining the
copy operation.

This command fulfills the same task as
[vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html) but is executed by the host.

This command produces the same results as
[vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html), but writes its result
directly to a host pointer, and is executed on the host rather than the
device.
The output **may** not necessarily be bit-for-bit identical, but it can be
equally used by either [vkCmdCopyMemoryToAccelerationStructureKHR](vkCmdCopyMemoryToAccelerationStructureKHR.html) or
[vkCopyMemoryToAccelerationStructureKHR](vkCopyMemoryToAccelerationStructureKHR.html).

Valid Usage

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-accelerationStructureHostCommands-03584) VUID-vkCopyAccelerationStructureToMemoryKHR-accelerationStructureHostCommands-03584

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureHostCommands`](../../../../spec/latest/chapters/features.html#features-accelerationStructureHostCommands)
feature **must** be enabled

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-03678) VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03731) VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03731

`pInfo->src` **must** be bound to host-visible device memory

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03732) VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03732

`pInfo->dst.hostAddress` **must** be a valid host pointer

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03751) VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-03751

`pInfo->dst.hostAddress` **must** be aligned to 16 bytes

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-buffer-03783) VUID-vkCopyAccelerationStructureToMemoryKHR-buffer-03783

`pInfo->src` **must** not be bound to memory that was allocated with
multiple instances

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-src-11678) VUID-vkCopyAccelerationStructureToMemoryKHR-src-11678

`pInfo->src` **must** have been created with
[vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-device-parameter) VUID-vkCopyAccelerationStructureToMemoryKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-parameter) VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-parameter) VUID-vkCopyAccelerationStructureToMemoryKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyAccelerationStructureToMemoryInfoKHR](VkCopyAccelerationStructureToMemoryInfoKHR.html) structure

* 
[](#VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-parent) VUID-vkCopyAccelerationStructureToMemoryKHR-deferredOperation-parent

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

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkCopyAccelerationStructureToMemoryInfoKHR](VkCopyAccelerationStructureToMemoryInfoKHR.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCopyAccelerationStructureToMemoryKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
