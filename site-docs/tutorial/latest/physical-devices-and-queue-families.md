# Physical devices and queue families

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/03_Drawing_a_triangle/00_Setup/03_Physical_devices_and_queue_families.html

## Table of Contents

- [Selecting a physical device](#_selecting_a_physical_device)
- [Selecting_a_physical_device](#_selecting_a_physical_device)
- [Base device suitability checks](#_base_device_suitability_checks)
- [Base_device_suitability_checks](#_base_device_suitability_checks)
- [API version check](#_api_version_check)
- [API_version_check](#_api_version_check)
- [Queue family check](#_queue_family_check)
- [Queue_family_check](#_queue_family_check)
- [Required extension check](#_required_extension_check)
- [Required_extension_check](#_required_extension_check)
- [Required feature check](#_required_feature_check)
- [Required_feature_check](#_required_feature_check)
- [The complete function](#_the_complete_function)
- [The_complete_function](#_the_complete_function)

## Content

After initializing the Vulkan library through a vk::raii::Instance we need to look for
and select a graphics card in the system that supports the features we need. In
fact, we can select any number of graphics cards and use them simultaneously, but
in this tutorial we’ll stick to the first graphics card that suits our needs.

We’ll add a function `pickPhysicalDevice` and add a call to it in the
`initVulkan` function.

void initVulkan()
{
    createInstance();
    setupDebugMessenger();
    pickPhysicalDevice();
}

void pickPhysicalDevice()
{
}

The graphics card that we’ll end up selecting will be stored in a
vk::raii::PhysicalDevice added as a new class member.

vk::raii::PhysicalDevice physicalDevice = nullptr;

Listing the graphics cards is very similar to listing extensions and starts with
querying just the number.

auto physicalDevices = instance.enumeratePhysicalDevices()

If there are no devices with Vulkan support, then there is no point going
further.

if (physicalDevices.empty())
{
    throw std::runtime_error("failed to find GPUs with Vulkan support!");
}

Now we need to evaluate each of them and check if they are suitable for the
operations we want to perform, because not all graphics cards are created equal.
We’ll check if any of the physical devices meet the requirements that we’ll
add to that function.

for (physicalDevice : physicalDevices)
{
    break;
}

To evaluate the suitability of a device, we can start by querying for some
details. Basic device properties like the name, type and supported Vulkan
version can be queried using vk::raii::PhysicalDevice::getProperties.

auto deviceProperties = physicalDevice.getProperties();

The support for optional features like texture compression, 64-bit floats and
multi viewport rendering (useful for VR) can be queried using
vk::raii::PhysicalDevice::getFeatures:

auto deviceFeatures = physicalDevice.getFeatures();

There are more details that can be queried from devices that we’ll discuss later
concerning device memory and queue families (see the next section).

As an example, let’s say we consider our application only usable for dedicated
graphics cards that support geometry shaders. Then the `isDeviceSuitable`
function would look like this:

bool isDeviceSuitable(vk::raii::PhysicalDevice const & physicalDevice)
{
    auto deviceProperties = physicalDevice.getProperties();
    auto deviceFeatures = physicalDevice.getFeatures();

    if (deviceProperties.deviceType == vk::PhysicalDeviceType::eDiscreteGpu && deviceFeatures.geometryShader) {
        return true;
    }

    return false;
}

Instead of just checking if a device is suitable or not and going with the first
one, you could also give each device a score and pick the highest one. That way
you could favor a dedicated graphics card by giving it a higher score, but fall
back to an integrated GPU if that’s the only available one. You could implement
something like that as follows:

#include 

...

void pickPhysicalDevice()
{
    auto physicalDevices = vk::raii::PhysicalDevices( instance );
    if (physicalDevices.empty())
    {
        throw std::runtime_error( "failed to find GPUs with Vulkan support!" );
    }

    // Use an ordered map to automatically sort candidates by increasing score
    std::multimap candidates;

    for (const auto& pd : physicalDevices)
    {
        auto deviceProperties = pd.getProperties();
        auto deviceFeatures = pd.getFeatures();
        uint32_t score = 0;

        // Discrete GPUs have a significant performance advantage
        if (deviceProperties.deviceType == vk::PhysicalDeviceType::eDiscreteGpu) {
            score += 1000;
        }

        // Maximum possible size of textures affects graphics quality
        score += deviceProperties.limits.maxImageDimension2D;

        // Application can't function without geometry shaders
        if (!deviceFeatures.geometryShader)
        {
           continue;
        }
        candidates.insert(std::make_pair(score, pd));
    }

    // Check if the best candidate is suitable at all
    if (!candidates.empty() && candidates.rbegin()->first > 0)
    {
        physicalDevice = candidates.rbegin()->second;
    }
    else
    {
        throw std::runtime_error("failed to find a suitable GPU!");
    }
}

You don’t need to implement all that for this tutorial, but it’s to give you an
idea of how you could design your device selection process. Of course, you can
also display the names of the choices and allow the user to select.

For this tutorial, we will use four criteria that must all be met by a physical device in order
to be selected:
- support of Vulkan 1.3,
- a queue family that supports graphics operations,
- support of all required extensions (here we only need vk::KHRSwapchainExtensionName), and
- support of all required features.

To check for Vulkan 1.3 support, you can check the apiVersion of the physical device properties:

bool supportsVulkan1_3 = physicalDevice.getProperties().apiVersion >= vk::ApiVersion13;

It has been briefly touched upon before that almost every operation in Vulkan,
anything from drawing to uploading textures, requires commands to be submitted
to a queue. There are different types of queues that originate from different
**queue families**, and each family of queues allows only a subset of commands. For
example, there could be a queue family that only allows processing of compute
commands or one that only allows memory transfer related commands.

We need to check which queue families are supported by the device and which one
of these supports the commands that we want to use. Right now we are only
going to look for a queue that supports graphics commands, so the code
could look like this:

auto queueFamilies = physicalDevice.getQueueFamilyProperties();
bool supportsGraphics =
    std::ranges::any_of(queueFamilies, [](auto const &qfp) { return !!(qfp.queueFlags & vk::QueueFlagBits::eGraphics); });

Currently, we only need one extension: vk::KHRSwapchainExtensionName. But regardless of
how many extensions we need, we must verify that each required device extension
is actually supported by the physical device:

std::vector requiredDeviceExtension = {vk::KHRSwapchainExtensionName};

auto availableDeviceExtensions = physicalDevice.enumerateDeviceExtensionProperties();
bool supportsAllRequiredExtensions =
  std::ranges::all_of( requiredDeviceExtension,
                       [&availableDeviceExtensions]( auto const & requiredDeviceExtension )
                       {
                           return std::ranges::any_of( availableDeviceExtensions,
                                                       [requiredDeviceExtension]( auto const & availableDeviceExtension )
                                                       { return strcmp( availableDeviceExtension.extensionName, requiredDeviceExtension ) == 0; } );
                       } );

Finally, we need to check that all optionally supported required features are actually supported:

auto features                 = physicalDevice.template getFeatures2();
bool supportsRequiredFeatures = features.template get().dynamicRendering &&
                                features.template get().extendedDynamicState;

When we put all these pieces together, we get this function for selecting a physical device:

std::vector requiredDeviceExtension = {vk::KHRSwapchainExtensionName};

bool isDeviceSuitable( vk::raii::PhysicalDevice const & physicalDevice )
{
  // Check if the physicalDevice supports the Vulkan 1.3 API version
  bool supportsVulkan1_3 = physicalDevice.getProperties().apiVersion >= vk::ApiVersion13;

  // Check if any of the queue families support graphics operations
  auto queueFamilies    = physicalDevice.getQueueFamilyProperties();
  bool supportsGraphics = std::ranges::any_of( queueFamilies, []( auto const & qfp ) { return !!( qfp.queueFlags & vk::QueueFlagBits::eGraphics ); } );

  // Check if all required physicalDevice extensions are available
  auto availableDeviceExtensions = physicalDevice.enumerateDeviceExtensionProperties();
  bool supportsAllRequiredExtensions =
    std::ranges::all_of( requiredDeviceExtension,
                         [&availableDeviceExtensions]( auto const & requiredDeviceExtension )
                         {
                           return std::ranges::any_of( availableDeviceExtensions,
                                                       [requiredDeviceExtension]( auto const & availableDeviceExtension )
                                                       { return strcmp( availableDeviceExtension.extensionName, requiredDeviceExtension ) == 0; } );
                         } );

  // Check if the physicalDevice supports the required features (dynamic rendering and extended dynamic state)
  auto features =
    physicalDevice
      .template getFeatures2();
  bool supportsRequiredFeatures = features.template get().dynamicRendering &&
                                  features.template get().extendedDynamicState;

  // Return true if the physicalDevice meets all the criteria
  return supportsVulkan1_3 && supportsGraphics && supportsAllRequiredExtensions && supportsRequiredFeatures;
}

void pickPhysicalDevice()
{
  std::vector physicalDevices = instance.enumeratePhysicalDevices();
  auto const devIter = std::ranges::find_if( physicalDevices, [&]( auto const & physicalDevice ) { return isDeviceSuitable( physicalDevice ); } );
  if ( devIter == physicalDevices.end() )
  {
    throw std::runtime_error( "failed to find a suitable GPU!" );
  }
  physicalDevice = *devIter;
}

Great, that’s all we need for now to find the right physical device! The next
step is to [create a logical device](04_Logical_device_and_queues.html)
to interface with it.

[C++ code](../../_attachments/03_physical_device_selection.cpp)
