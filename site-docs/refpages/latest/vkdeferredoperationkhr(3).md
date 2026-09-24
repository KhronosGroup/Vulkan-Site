# VkDeferredOperationKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeferredOperationKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeferredOperationKHR - A deferred operation

The `VkDeferredOperationKHR` handle is defined as:

// Provided by VK_KHR_deferred_host_operations
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDeferredOperationKHR)

This handle refers to a tracking structure which manages the execution state
for a deferred command.

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html), [vkBuildAccelerationStructuresKHR](vkBuildAccelerationStructuresKHR.html), [vkBuildMicromapsEXT](vkBuildMicromapsEXT.html), [vkCopyAccelerationStructureKHR](vkCopyAccelerationStructureKHR.html), [vkCopyAccelerationStructureToMemoryKHR](vkCopyAccelerationStructureToMemoryKHR.html), [vkCopyMemoryToAccelerationStructureKHR](vkCopyMemoryToAccelerationStructureKHR.html), [vkCopyMemoryToMicromapEXT](vkCopyMemoryToMicromapEXT.html), [vkCopyMicromapEXT](vkCopyMicromapEXT.html), [vkCopyMicromapToMemoryEXT](vkCopyMicromapToMemoryEXT.html), [vkCreateDataGraphPipelinesARM](vkCreateDataGraphPipelinesARM.html), [vkCreateDeferredOperationKHR](vkCreateDeferredOperationKHR.html), [vkCreateRayTracingPipelinesKHR](vkCreateRayTracingPipelinesKHR.html), [vkDeferredOperationJoinKHR](vkDeferredOperationJoinKHR.html), [vkDestroyDeferredOperationKHR](vkDestroyDeferredOperationKHR.html), [vkGetDeferredOperationMaxConcurrencyKHR](vkGetDeferredOperationMaxConcurrencyKHR.html), [vkGetDeferredOperationResultKHR](vkGetDeferredOperationResultKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
