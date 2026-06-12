# VkDeviceAddress(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceAddress.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceAddress - Vulkan device address type

`VkDeviceAddress` represents device buffer address values:

// Provided by VK_VERSION_1_0
typedef uint64_t VkDeviceAddress;

Valid Usage

* 
[](#VUID-VkDeviceAddress-size-11364) VUID-VkDeviceAddress-size-11364

A valid `VkDeviceAddress` **must** be equal to the sum of an address
retrieved from a [VkBuffer](VkBuffer.html) via [vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html), and
any offset in the range [0, `size`), where `size` is the
value of [VkBufferCreateInfo](VkBufferCreateInfo.html)::`size` used to create that
[VkBuffer](VkBuffer.html)

* 
[](#VUID-VkDeviceAddress-None-10894) VUID-VkDeviceAddress-None-10894

If a `VkDeviceAddress` was retrieved from a non-sparse buffer,
that buffer **must** be bound completely and contiguously to a single
`VkDeviceMemory` object

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html), [VkBindIndexBufferIndirectCommandEXT](VkBindIndexBufferIndirectCommandEXT.html), [VkBindIndexBufferIndirectCommandNV](VkBindIndexBufferIndirectCommandNV.html), [VkBindPipelineIndirectCommandNV](VkBindPipelineIndirectCommandNV.html), [VkBindVertexBufferIndirectCommandEXT](VkBindVertexBufferIndirectCommandEXT.html), [VkBindVertexBufferIndirectCommandNV](VkBindVertexBufferIndirectCommandNV.html), [VkBufferDeviceAddressCreateInfoEXT](VkBufferDeviceAddressCreateInfoEXT.html), [VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html), [VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV](VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV.html), [VkClusterAccelerationStructureBuildTriangleClusterInfoNV](VkClusterAccelerationStructureBuildTriangleClusterInfoNV.html), [VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV.html), [VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html), [VkClusterAccelerationStructureGetTemplateIndicesInfoNV](VkClusterAccelerationStructureGetTemplateIndicesInfoNV.html), [VkClusterAccelerationStructureInstantiateClusterInfoNV](VkClusterAccelerationStructureInstantiateClusterInfoNV.html), [VkClusterAccelerationStructureMoveObjectsInfoNV](VkClusterAccelerationStructureMoveObjectsInfoNV.html), [VkComputePipelineIndirectBufferInfoNV](VkComputePipelineIndirectBufferInfoNV.html), [VkCopyMemoryIndirectCommandKHR](VkCopyMemoryIndirectCommandKHR.html), [VkCopyMemoryToImageIndirectCommandKHR](VkCopyMemoryToImageIndirectCommandKHR.html), [VkDecompressMemoryRegionEXT](VkDecompressMemoryRegionEXT.html), [VkDecompressMemoryRegionNV](VkDecompressMemoryRegionNV.html), [VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html), [VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html), [VkDescriptorDataEXT](VkDescriptorDataEXT.html), [VkDeviceAddressBindingCallbackDataEXT](VkDeviceAddressBindingCallbackDataEXT.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkDeviceFaultAddressInfoEXT](VkDeviceFaultAddressInfoEXT.html), [VkDeviceOrHostAddressConstAMDX](VkDeviceOrHostAddressConstAMDX.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), [VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html), [VkDrawIndirectCountIndirectCommandEXT](VkDrawIndirectCountIndirectCommandEXT.html), [VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html), [VkImageViewAddressPropertiesNVX](VkImageViewAddressPropertiesNVX.html), [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html), [VkPartitionedAccelerationStructureUpdateInstanceDataNV](VkPartitionedAccelerationStructureUpdateInstanceDataNV.html), [VkPartitionedAccelerationStructureWriteInstanceDataNV](VkPartitionedAccelerationStructureWriteInstanceDataNV.html), [VkRenderPassPerformanceCountersByRegionBeginInfoARM](VkRenderPassPerformanceCountersByRegionBeginInfoARM.html), [VkStridedDeviceAddressNV](VkStridedDeviceAddressNV.html), [VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html), [VkStridedDeviceAddressRegionKHR](VkStridedDeviceAddressRegionKHR.html), [VkTraceRaysIndirectCommand2KHR](VkTraceRaysIndirectCommand2KHR.html), [VkWriteDescriptorSetPartitionedAccelerationStructureNV](VkWriteDescriptorSetPartitionedAccelerationStructureNV.html), [vkCmdBuildAccelerationStructuresIndirectKHR](vkCmdBuildAccelerationStructuresIndirectKHR.html), [vkCmdCopyMemoryIndirectNV](vkCmdCopyMemoryIndirectNV.html), [vkCmdCopyMemoryToImageIndirectNV](vkCmdCopyMemoryToImageIndirectNV.html), [vkCmdDecompressMemoryIndirectCountEXT](vkCmdDecompressMemoryIndirectCountEXT.html), [vkCmdDecompressMemoryIndirectCountNV](vkCmdDecompressMemoryIndirectCountNV.html), [vkCmdDispatchGraphAMDX](vkCmdDispatchGraphAMDX.html), [vkCmdDispatchGraphIndirectAMDX](vkCmdDispatchGraphIndirectAMDX.html), [vkCmdDispatchGraphIndirectCountAMDX](vkCmdDispatchGraphIndirectCountAMDX.html), [vkCmdInitializeGraphScratchMemoryAMDX](vkCmdInitializeGraphScratchMemoryAMDX.html), [vkCmdTraceRaysIndirect2KHR](vkCmdTraceRaysIndirect2KHR.html), [vkCmdTraceRaysIndirectKHR](vkCmdTraceRaysIndirectKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkDeviceAddress).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
