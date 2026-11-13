# vkEndCommandBuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkEndCommandBuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkEndCommandBuffer - Finish recording a command buffer

To complete recording of a command buffer, call:

// Provided by VK_VERSION_1_0
VkResult vkEndCommandBuffer(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer to complete recording.

The command buffer **must** have been in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle), and, if successful, is moved to the
[executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

If there was an error during recording, the application will be notified by
an unsuccessful return code returned by `vkEndCommandBuffer`, and the
command buffer will be moved to the [invalid state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

In case the application recorded one or more [video encode operations](../../../../spec/latest/chapters/videocoding.html#video-encode-operations) into the command buffer, implementations **may** return the
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](VkResult.html) error if any of the
specified Video Std parameters do not adhere to the syntactic or semantic
requirements of the used video compression standard, or if values derived
from parameters according to the rules defined by the used video compression
standard do not adhere to the capabilities of the video compression standard
or the implementation.

|  | Applications **should** not rely on the
| --- | --- |
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](VkResult.html) error being returned by any
command as a means to verify Video Std parameters, as implementations are
not required to report the error in any specific set of cases. |

Valid Usage

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-00059) VUID-vkEndCommandBuffer-commandBuffer-00059

`commandBuffer` **must** be in the [    recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-00060) VUID-vkEndCommandBuffer-commandBuffer-00060

If `commandBuffer` is a primary command buffer, there **must** not be
an active render pass instance

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-00061) VUID-vkEndCommandBuffer-commandBuffer-00061

All queries made [active](../../../../spec/latest/chapters/queries.html#queries-operation-active) during the
recording of `commandBuffer` **must** have been made inactive

* 
[](#VUID-vkEndCommandBuffer-None-01978) VUID-vkEndCommandBuffer-None-01978

Conditional rendering **must** not be
[active](../../../../spec/latest/chapters/drawing.html#active-conditional-rendering)

* 
[](#VUID-vkEndCommandBuffer-None-06991) VUID-vkEndCommandBuffer-None-06991

There **must** be no video session object bound

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-01815) VUID-vkEndCommandBuffer-commandBuffer-01815

If `commandBuffer` is a secondary command buffer, there **must** not be
an outstanding [vkCmdBeginDebugUtilsLabelEXT](vkCmdBeginDebugUtilsLabelEXT.html) command recorded to
`commandBuffer` that has not previously been ended by a call to
[vkCmdEndDebugUtilsLabelEXT](vkCmdEndDebugUtilsLabelEXT.html)

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-00062) VUID-vkEndCommandBuffer-commandBuffer-00062

If `commandBuffer` is a secondary command buffer, there **must** not be
an outstanding [vkCmdDebugMarkerBeginEXT](vkCmdDebugMarkerBeginEXT.html) command recorded to
`commandBuffer` that has not previously been ended by a call to
[vkCmdDebugMarkerEndEXT](vkCmdDebugMarkerEndEXT.html)

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-12372) VUID-vkEndCommandBuffer-commandBuffer-12372

`commandBuffer` **must** not have any shader instrumentation
[active](../../../../spec/latest/chapters/shaders.html#shaders-instrumentation-active)

Valid Usage (Implicit)

* 
[](#VUID-vkEndCommandBuffer-commandBuffer-parameter) VUID-vkEndCommandBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkEndCommandBuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
