# VkBuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBuffer - Opaque handle to a buffer object

Buffers represent linear arrays of data which are used for various purposes
by binding them to a graphics or compute pipeline via descriptor sets or
certain commands, or by directly specifying them as parameters to certain
commands.

Buffers are represented by `VkBuffer` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkBuffer)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html), [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html), [VkBufferCaptureDescriptorDataInfoEXT](VkBufferCaptureDescriptorDataInfoEXT.html), [VkBufferDeviceAddressInfo](VkBufferDeviceAddressInfo.html), [VkBufferMemoryBarrier](VkBufferMemoryBarrier.html), [VkBufferMemoryBarrier2](VkBufferMemoryBarrier2.html), [VkBufferMemoryRequirementsInfo2](VkBufferMemoryRequirementsInfo2.html), [VkBufferViewCreateInfo](VkBufferViewCreateInfo.html), [VkConditionalRenderingBeginInfoEXT](VkConditionalRenderingBeginInfoEXT.html), [VkCopyBufferInfo2](VkCopyBufferInfo2.html), [VkCopyBufferToImageInfo2](VkCopyBufferToImageInfo2.html), [VkCopyImageToBufferInfo2](VkCopyImageToBufferInfo2.html), [VkDedicatedAllocationMemoryAllocateInfoNV](VkDedicatedAllocationMemoryAllocateInfoNV.html), [VkDescriptorBufferBindingPushDescriptorBufferHandleEXT](VkDescriptorBufferBindingPushDescriptorBufferHandleEXT.html), [VkDescriptorBufferInfo](VkDescriptorBufferInfo.html), [VkFrameBoundaryEXT](VkFrameBoundaryEXT.html), [VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html), [VkGeometryAABBNV](VkGeometryAABBNV.html), [VkGeometryTrianglesNV](VkGeometryTrianglesNV.html), [VkIndirectCommandsStreamNV](VkIndirectCommandsStreamNV.html), [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html), [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html), [VkSparseBufferMemoryBindInfo](VkSparseBufferMemoryBindInfo.html), [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html), [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html), [vkBindBufferMemory](vkBindBufferMemory.html), [vkCmdBeginTransformFeedbackEXT](vkCmdBeginTransformFeedbackEXT.html), [vkCmdBindIndexBuffer](vkCmdBindIndexBuffer.html), [vkCmdBindIndexBuffer2](vkCmdBindIndexBuffer2.html), [vkCmdBindIndexBuffer2](vkCmdBindIndexBuffer2.html), [vkCmdBindTransformFeedbackBuffersEXT](vkCmdBindTransformFeedbackBuffersEXT.html), [vkCmdBindVertexBuffers](vkCmdBindVertexBuffers.html), [vkCmdBindVertexBuffers2](vkCmdBindVertexBuffers2.html), [vkCmdBindVertexBuffers2](vkCmdBindVertexBuffers2.html), [vkCmdBuildAccelerationStructureNV](vkCmdBuildAccelerationStructureNV.html), [vkCmdCopyBuffer](vkCmdCopyBuffer.html), [vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html), [vkCmdCopyImageToBuffer](vkCmdCopyImageToBuffer.html), [vkCmdCopyQueryPoolResults](vkCmdCopyQueryPoolResults.html), [vkCmdDispatchIndirect](vkCmdDispatchIndirect.html), [vkCmdDrawClusterIndirectHUAWEI](vkCmdDrawClusterIndirectHUAWEI.html), [vkCmdDrawIndexedIndirect](vkCmdDrawIndexedIndirect.html), [vkCmdDrawIndexedIndirectCount](vkCmdDrawIndexedIndirectCount.html), [vkCmdDrawIndexedIndirectCount](vkCmdDrawIndexedIndirectCount.html), [vkCmdDrawIndexedIndirectCount](vkCmdDrawIndexedIndirectCount.html), [vkCmdDrawIndirect](vkCmdDrawIndirect.html), [vkCmdDrawIndirectByteCountEXT](vkCmdDrawIndirectByteCountEXT.html), [vkCmdDrawIndirectCount](vkCmdDrawIndirectCount.html), [vkCmdDrawIndirectCount](vkCmdDrawIndirectCount.html), [vkCmdDrawIndirectCount](vkCmdDrawIndirectCount.html), [vkCmdDrawMeshTasksIndirectCountEXT](vkCmdDrawMeshTasksIndirectCountEXT.html), [vkCmdDrawMeshTasksIndirectCountNV](vkCmdDrawMeshTasksIndirectCountNV.html), [vkCmdDrawMeshTasksIndirectEXT](vkCmdDrawMeshTasksIndirectEXT.html), [vkCmdDrawMeshTasksIndirectNV](vkCmdDrawMeshTasksIndirectNV.html), [vkCmdEndTransformFeedbackEXT](vkCmdEndTransformFeedbackEXT.html), [vkCmdFillBuffer](vkCmdFillBuffer.html), [vkCmdTraceRaysNV](vkCmdTraceRaysNV.html), [vkCmdUpdateBuffer](vkCmdUpdateBuffer.html), [vkCmdWriteBufferMarker2AMD](vkCmdWriteBufferMarker2AMD.html), [vkCmdWriteBufferMarkerAMD](vkCmdWriteBufferMarkerAMD.html), [vkCreateBuffer](vkCreateBuffer.html), [vkDestroyBuffer](vkDestroyBuffer.html), [vkGetBufferMemoryRequirements](vkGetBufferMemoryRequirements.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
