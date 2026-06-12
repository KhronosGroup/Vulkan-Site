# VK_KHR_device_address_commands(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_device_address_commands.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_device_address_commands](#VK_KHR_device_address_commands)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_device_address_commands - device extension

**Name String**

`VK_KHR_device_address_commands`

**Extension Type**

Device extension

**Registered Extension Number**

319

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

                 [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

                 or

                 [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

             and

             [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

         or

         [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

     and

     [VK_KHR_synchronization2](VK_KHR_synchronization2.html)

     and

     [VK_EXT_extended_dynamic_state](VK_EXT_extended_dynamic_state.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**API Interactions**

* 
Interacts with VK_VERSION_1_2

* 
Interacts with VK_AMD_buffer_marker

* 
Interacts with VK_EXT_conditional_rendering

* 
Interacts with VK_EXT_mesh_shader

* 
Interacts with VK_EXT_transform_feedback

* 
Interacts with VK_KHR_acceleration_structure

* 
Interacts with VK_KHR_draw_indirect_count

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_device_address_commands] @tobski%0A*Here describe the issue or question you have about the VK_KHR_device_address_commands extension*)

**Extension Proposal**

[VK_KHR_device_address_commands](../../../../features/latest/features/proposals/VK_KHR_device_address_commands.html)

**Last Modified Date**

2026-03-10

**Contributors**

* 
Tobias Hector, AMD

* 
Matthew Netsch, Qualcomm Technologies, Inc

* 
Jan-Harald Fredriksen, Arm

* 
Mike Blumenkrantz, Valve

* 
Allan MacKinnon, Google

* 
Daniel Koch, NVIDIA

* 
Autumn Ashton, Valve

* 
Piers Daniell, NVIDIA

* 
Stuart Smith, AMD

* 
Caterina Shablia, Collabora

* 
Piotr Byszewski, Cognizant

* 
James Fitzpatrick, Imagination

* 
Daniel Story, Nintendo

* 
Baldur Karlsson, Valve

* 
Jon Leech, Khronos

* 
Samuel Pitoiset, Valve

* 
Lionel Landwerlin, Intel

* 
Hans-Kristian Arntzen, Valve

* 
Žiga Markuš, LunarG

* 
Spencer Fricke, Lunarg

* 
Per Inge Mathisen, Arm

* 
Vikram Kushwaha, NVIDIA

* 
Ralph Potter, Samsung

* 
Marijn Suijten, Traverse Research

* 
Ricard Garcia, Igalia

* 
Mengyang Liu, AMD

* 
Artem Kharytoniuk, LunarG

* 
Marty Johnson, Khronos

* 
Alyssa Rosenzweig, Valve

This extension enables applications to use device addresses in place of
buffer objects for most functionality.

* 
[vkCmdBindIndexBuffer3KHR](vkCmdBindIndexBuffer3KHR.html)

* 
[vkCmdBindVertexBuffers3KHR](vkCmdBindVertexBuffers3KHR.html)

* 
[vkCmdCopyImageToMemoryKHR](vkCmdCopyImageToMemoryKHR.html)

* 
[vkCmdCopyMemoryKHR](vkCmdCopyMemoryKHR.html)

* 
[vkCmdCopyMemoryToImageKHR](vkCmdCopyMemoryToImageKHR.html)

* 
[vkCmdCopyQueryPoolResultsToMemoryKHR](vkCmdCopyQueryPoolResultsToMemoryKHR.html)

* 
[vkCmdDispatchIndirect2KHR](vkCmdDispatchIndirect2KHR.html)

* 
[vkCmdDrawIndexedIndirect2KHR](vkCmdDrawIndexedIndirect2KHR.html)

* 
[vkCmdDrawIndirect2KHR](vkCmdDrawIndirect2KHR.html)

* 
[vkCmdFillMemoryKHR](vkCmdFillMemoryKHR.html)

* 
[vkCmdUpdateMemoryKHR](vkCmdUpdateMemoryKHR.html)

If [VK_KHR_draw_indirect_count](VK_KHR_draw_indirect_count.html) or [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2) and [VK_EXT_mesh_shader](VK_EXT_mesh_shader.html) is supported:

* 
[vkCmdDrawMeshTasksIndirectCount2EXT](vkCmdDrawMeshTasksIndirectCount2EXT.html)

If [VK_AMD_buffer_marker](VK_AMD_buffer_marker.html) is supported:

* 
[vkCmdWriteMarkerToMemoryAMD](vkCmdWriteMarkerToMemoryAMD.html)

If [VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html) is supported:

* 
[vkCmdBeginConditionalRendering2EXT](vkCmdBeginConditionalRendering2EXT.html)

If [VK_EXT_mesh_shader](VK_EXT_mesh_shader.html) is supported:

* 
[vkCmdDrawMeshTasksIndirect2EXT](vkCmdDrawMeshTasksIndirect2EXT.html)

If [VK_EXT_transform_feedback](VK_EXT_transform_feedback.html) is supported:

* 
[vkCmdBeginTransformFeedback2EXT](vkCmdBeginTransformFeedback2EXT.html)

* 
[vkCmdBindTransformFeedbackBuffers2EXT](vkCmdBindTransformFeedbackBuffers2EXT.html)

* 
[vkCmdDrawIndirectByteCount2EXT](vkCmdDrawIndirectByteCount2EXT.html)

* 
[vkCmdEndTransformFeedback2EXT](vkCmdEndTransformFeedback2EXT.html)

If [VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html) is supported:

* 
[vkCreateAccelerationStructure2KHR](vkCreateAccelerationStructure2KHR.html)

If [VK_KHR_draw_indirect_count](VK_KHR_draw_indirect_count.html) or [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2) is supported:

* 
[vkCmdDrawIndexedIndirectCount2KHR](vkCmdDrawIndexedIndirectCount2KHR.html)

* 
[vkCmdDrawIndirectCount2KHR](vkCmdDrawIndirectCount2KHR.html)

* 
[VkBindIndexBuffer3InfoKHR](VkBindIndexBuffer3InfoKHR.html)

* 
[VkBindVertexBuffer3InfoKHR](VkBindVertexBuffer3InfoKHR.html)

* 
[VkCopyDeviceMemoryImageInfoKHR](VkCopyDeviceMemoryImageInfoKHR.html)

* 
[VkCopyDeviceMemoryInfoKHR](VkCopyDeviceMemoryInfoKHR.html)

* 
[VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html)

* 
[VkDeviceMemoryCopyKHR](VkDeviceMemoryCopyKHR.html)

* 
[VkDeviceMemoryImageCopyKHR](VkDeviceMemoryImageCopyKHR.html)

* 
[VkDispatchIndirect2InfoKHR](VkDispatchIndirect2InfoKHR.html)

* 
[VkDrawIndirect2InfoKHR](VkDrawIndirect2InfoKHR.html)

* 
[VkDrawIndirectCount2InfoKHR](VkDrawIndirectCount2InfoKHR.html)

* 
[VkMemoryRangeBarrierKHR](VkMemoryRangeBarrierKHR.html)

* 
[VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html)

* 
Extending [VkDependencyInfo](VkDependencyInfo.html):

[VkMemoryRangeBarriersInfoKHR](VkMemoryRangeBarriersInfoKHR.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR](VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR.html)

If [VK_AMD_buffer_marker](VK_AMD_buffer_marker.html) is supported:

* 
[VkMemoryMarkerInfoAMD](VkMemoryMarkerInfoAMD.html)

If [VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html) is supported:

* 
[VkConditionalRenderingBeginInfo2EXT](VkConditionalRenderingBeginInfo2EXT.html)

If [VK_EXT_transform_feedback](VK_EXT_transform_feedback.html) is supported:

* 
[VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html)

If [VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html) is supported:

* 
[VkAccelerationStructureCreateInfo2KHR](VkAccelerationStructureCreateInfo2KHR.html)

* 
[VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html)

* 
[VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html)

* 
`VK_KHR_DEVICE_ADDRESS_COMMANDS_EXTENSION_NAME`

* 
`VK_KHR_DEVICE_ADDRESS_COMMANDS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_BIND_INDEX_BUFFER_3_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_VERTEX_BUFFER_3_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_DEVICE_MEMORY_IMAGE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_DEVICE_MEMORY_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_MEMORY_COPY_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_MEMORY_IMAGE_COPY_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DISPATCH_INDIRECT_2_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DRAW_INDIRECT_2_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DRAW_INDIRECT_COUNT_2_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_RANGE_BARRIERS_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_RANGE_BARRIER_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_ADDRESS_COMMANDS_FEATURES_KHR](VkStructureType.html)

If [VK_AMD_buffer_marker](VK_AMD_buffer_marker.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_MEMORY_MARKER_INFO_AMD](VkStructureType.html)

If [VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_CONDITIONAL_RENDERING_BEGIN_INFO_2_EXT](VkStructureType.html)

If [VK_EXT_transform_feedback](VK_EXT_transform_feedback.html) is supported:

* 
Extending [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html):

[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BIND_TRANSFORM_FEEDBACK_BUFFER_2_INFO_EXT](VkStructureType.html)

If [VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_2_KHR](VkStructureType.html)

* 
Revision 1, 2026-03-10 (Tobias Hector)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_device_address_commands).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
