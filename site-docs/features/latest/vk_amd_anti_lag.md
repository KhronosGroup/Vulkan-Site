# VK_AMD_anti_lag

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_AMD_anti_lag.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Features](#_features)
- [4. Examples](#_examples)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Features](#_features)

[4. Examples](#_examples)

This document describes a proposal for a new AMD function that allows the precision of AntiLag to be improved.

([AMD AntiLag](https://www.amd.com/en/products/software/adrenalin/radeon-software-anti-lag.html)) automatically paces the CPU to make sure it does not get too far ahead of the GPU, reducing the latency between inputs received and updates on the screen.
Additionally, Anti-Lag+ offers applications the ability to inform the driver when input processing begins, in order to align the timing of display updates, enabling even lower latency between receiving input and displaying on the screen.
Currently, this technology is not exposed via Vulkan, and this proposal aims to change that.

The solution must enable applications to inform the driver when input processing begins, to minimize display latency.

typedef enum VkAntiLagModeAMD
{
    VK_ANTI_LAG_MODE_DRIVER_CONTROL_AMD  = 0x00000000,
    VK_ANTI_LAG_MODE_ON_AMD              = 0x00000001,
    VK_ANTI_LAG_MODE_OFF_AMD             = 0x00000002
} VkAntiLagModeAMD;

* 
`VK_ANTI_LAG_MODE_DRIVER_CONTROL_AMD` - AntiLag will be enabled or disabled depending on driver settings.

* 
`VK_ANTI_LAG_MODE_ON_AMD`             - AntiLag will be enabled.

* 
`VK_ANTI_LAG_MODE_OFF_AMD`            - AntiLag will be disabled.

typedef enum VkAntiLagStageAMD
{
    VK_ANTI_LAG_STAGE_INPUT_AMD     = 0x00000000,
    VK_ANTI_LAG_STAGE_PRESENT_AMD   = 0x00000001,
} VkAntiLagStageAMD;

* 
`VK_ANTI_LAG_STAGE_INPUT_AMD`   - stage: before processing input.

* 
`VK_ANTI_LAG_STAGE_PRESENT_AMD` - stage: before `vkQueuePresentKHR`.

typedef struct VkAntiLagPresentationInfoAMD {
    VkStructureType     sType;
    void*               pNext;
    VkAntiLagStageAMD   stage;
    uint64_t            frameIndex;
} VkAntiLagPresentationInfoAMD;

* 
`frameIndex` -  frame index to corresponding stage. The `frameIndex` is set just before the input data processing (stage : VK_ANTI_LAG_STAGE_INPUT_AMD) and this same `frameIndex` should be set before the frame with current input data will be presenting by `vkQueuePresentKHR` (stage : VK_ANTI_LAG_STAGE_PRESENT_AMD), it should be done for each frame.

typedef struct VkAntiLagDataAMD {
    VkStructureType                      sType;
    const void*                          pNext;
    VkAntiLagModeAMD                     mode;
    uint32_t                             maxFPS;
    const VkAntiLagPresentationInfoAMD*  pPresentationInfo;
} VkAntiLagDataAMD;

* 
`maxFPS` - framerate limit used by application. The limit will be imposed, if application will render faster, the FPS will be reduce to the limit. The 0 value will disable the limit.

A new function `vkAntiLagUpdateAMD` is exposed to inform the driver when input processing begins:

void vkAntiLagUpdateAMD(
  VkDevice                device,
  const VkAntiLagDataAMD* pData);

If the device has been created with the feature `antiLag` set to true, AntiLag will be enabled.
`vkAntiLagUpdateAMD` should be executed immediately before input to the application is processed.
If `pPresentationInfo` is not `nullptr`, `vkAntiLagUpdateAMD` should be executed also before `QueuePresent`
with `pPresentationInfo` set to proper values. `vkAntiLagUpdateAMD` can be called with `pData` equal to `nullptr`.
If Antilag is enabled, `vkAntiLagUpdateAMD`, when called before processing application input,
might block for a finite time in order to reduce the latency between inputs received and updates on the screen.
Additionally, if `maxFPS` is not 0, `vkAntiLagUpdateAMD` might block in order to meet the specified FPS limit.

A single feature is exposed that enables this functionality:

typedef struct VkPhysicalDeviceAntiLagFeaturesAMD {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           antiLag;
} VkPhysicalDeviceAntiLagFeaturesAMD;

The `antiLag` feature only supports a single GPU and therefore cannot be enabled if the `VK_KHR_device_group_creation` extension is used to create a device with a `physicalDeviceCount` greater than 1.

Example 1:

while(true) // Render loop
{
.....
  // Inform driver about processing input and limit of FPS 60 used by application.
    const VkAntiLagDataAMD data =
  {
    VK_STRUCTURE_ANTI_LAG_DATA_AMD, // sType
    nullptr,                        // pNext
    VK_ANTI_LAG_MODE_ON_AMD,        // mode
    60,                             // maxFPS
    nullptr,                        // pPresentationInfo
  };

  VkAntiLagUpdateAMD(device, &data);

  ProcessingInputData(...);
...

  RenderFrame(...);

...
}

Example 2:

uint64_t frameIndex = 0ull;

while(true) // Render loop
{
.....
  VkAntiLagPresentationInfoAMD  presentationInfo =
  {
    VK_STRUCTURE_ANTI_LAG_PRESENTATION_INFO_AMD, // sType
    nullptr,                                     // pNext
    VK_ANTI_LAG_STAGE_INPUT_AMD,                 // stage
    frameIndex,                                  // frameIndex
  };

  const VkAntiLagDataAMD data =
  {
    VK_STRUCTURE_ANTI_LAG_DATA_AMD, // sType
    nullptr,                        // pNext
    VK_ANTI_LAG_MODE_ON_AMD,        // mode
    0,                              // maxFPS
    &presentationInfo,              // pPresentationInfo
  };

  VkAntiLagUpdateAMD(device, &data);

  ProcessingInputData(...);

...

  RenderFrame(...);

....

  VkAntiLagPresentationInfoAMD  presentationInfo =
  {
      VK_STRUCTURE_ANTI_LAG_PRESENTATION_INFO_AMD, // sType
      nullptr,                                     // pNext
      VK_ANTI_LAG_STAGE_PRESENT_AMD,               // stage
      frameIndex,                                  // frameIndex
  };

  const VkAntiLagDataAMD data =
  {
    VK_STRUCTURE_ANTI_LAG_DATA_AMD, // sType
    nullptr,                        // pNext
    VK_ANTI_LAG_MODE_ON_AMD,        // mode
    0,                              // maxFPS
    &presentationInfo,              // pPresentationInfo
  };

  vkAntiLagUpdateAMD(device, &data);

  vkQueuePresentKHR(queue, pPresentInfo);
  ...
  frameIndex++;
}
