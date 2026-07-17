# VkDeviceMemory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceMemory.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceMemory - Opaque handle to a device memory object

A Vulkan device operates on data in device memory via memory objects that
are represented in the API by a `VkDeviceMemory` handle:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDeviceMemory)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBindAccelerationStructureMemoryInfoNV](VkBindAccelerationStructureMemoryInfoNV.html), [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html), [VkBindDataGraphPipelineSessionMemoryInfoARM](VkBindDataGraphPipelineSessionMemoryInfoARM.html), [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html), [VkBindTensorMemoryInfoARM](VkBindTensorMemoryInfoARM.html), [VkBindVideoSessionMemoryInfoKHR](VkBindVideoSessionMemoryInfoKHR.html), [VkDeviceMemoryOpaqueCaptureAddressInfo](VkDeviceMemoryOpaqueCaptureAddressInfo.html), [VkExportMetalBufferInfoEXT](VkExportMetalBufferInfoEXT.html), [VkMappedMemoryRange](VkMappedMemoryRange.html), [VkMemoryGetAndroidHardwareBufferInfoANDROID](VkMemoryGetAndroidHardwareBufferInfoANDROID.html), [VkMemoryGetFdInfoKHR](VkMemoryGetFdInfoKHR.html), [VkMemoryGetMetalHandleInfoEXT](VkMemoryGetMetalHandleInfoEXT.html), [VkMemoryGetNativeBufferInfoOHOS](VkMemoryGetNativeBufferInfoOHOS.html), [VkMemoryGetRemoteAddressInfoNV](VkMemoryGetRemoteAddressInfoNV.html), [VkMemoryGetWin32HandleInfoKHR](VkMemoryGetWin32HandleInfoKHR.html), [VkMemoryGetZirconHandleInfoFUCHSIA](VkMemoryGetZirconHandleInfoFUCHSIA.html), [VkMemoryMapInfo](VkMemoryMapInfo.html), [VkMemoryUnmapInfo](VkMemoryUnmapInfo.html), [VkSparseImageMemoryBind](VkSparseImageMemoryBind.html), [VkSparseMemoryBind](VkSparseMemoryBind.html), [VkTileMemoryBindInfoQCOM](VkTileMemoryBindInfoQCOM.html), [VkWin32KeyedMutexAcquireReleaseInfoKHR](VkWin32KeyedMutexAcquireReleaseInfoKHR.html), [VkWin32KeyedMutexAcquireReleaseInfoNV](VkWin32KeyedMutexAcquireReleaseInfoNV.html), [vkAllocateMemory](vkAllocateMemory.html), [vkBindBufferMemory](vkBindBufferMemory.html), [vkBindImageMemory](vkBindImageMemory.html), [vkFreeMemory](vkFreeMemory.html), [vkGetDeviceMemoryCommitment](vkGetDeviceMemoryCommitment.html), [vkGetMemoryWin32HandleNV](vkGetMemoryWin32HandleNV.html), [vkMapMemory](vkMapMemory.html), [vkSetDeviceMemoryPriorityEXT](vkSetDeviceMemoryPriorityEXT.html), [vkUnmapMemory](vkUnmapMemory.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkDeviceMemory).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
