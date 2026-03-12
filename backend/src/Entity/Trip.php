<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use App\Repository\TripRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: TripRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            name: 'trip_list',
            normalizationContext: ['groups' => ['trip:read']],
        ),
        new Get(
            name: 'trip_detail',
            normalizationContext: ['groups' => ['trip:read', 'trip:read_detail']],
        ),
        new Post(
            name: 'trip_create',
            denormalizationContext: ['groups' => ['trip:write']],
            normalizationContext: ['groups' => ['trip:read']],
        ),
        new Patch(
            name: 'trip_update',
            denormalizationContext: ['groups' => ['trip:write']],
            normalizationContext: ['groups' => ['trip:read']],
        ),
        new Delete(
            name: 'trip_delete',
        ),
    ]
)]
class Trip
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['trip:read'])]
    private ?Uuid $id = null;

    #[ORM\ManyToOne(inversedBy: 'trips')]
    #[Groups(['trip:read', 'trip:write'])]
    private ?User $sender = null;

    #[ORM\Column(length: 255)]
    #[Groups(['trip:read', 'trip:write'])]
    private ?string $departureCountry = null;

    #[ORM\Column(length: 255)]
    #[Groups(['trip:read', 'trip:write'])]
    private ?string $departureCity = null;

    #[ORM\Column(length: 255)]
    #[Groups(['trip:read', 'trip:write'])]
    private ?string $arrivalCountry = null;

    #[ORM\Column(length: 255)]
    #[Groups(['trip:read', 'trip:write'])]
    private ?string $arrivalCity = null;

    #[ORM\Column]
    #[Groups(['trip:read', 'trip:write'])]
    private ?\DateTimeImmutable $departureDate = null;

    #[ORM\Column]
    #[Groups(['trip:read', 'trip:write'])]
    private ?float $availableWeight = null;

    #[ORM\Column]
    #[Groups(['trip:read', 'trip:write'])]
    private ?float $pricePerKg = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['trip:read', 'trip:write'])]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Groups(['trip:read', 'trip:write'])]
    private ?string $status = null;

    #[ORM\Column]
    #[Groups(['trip:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['trip:read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    /**
     * @var Collection<int, Reservation>
     */
    #[ORM\OneToMany(targetEntity: Reservation::class, mappedBy: 'trip')]
    #[Groups(['trip:read_detail'])]
    private Collection $reservations;

    /**
     * @var Collection<int, Message>
     */
    #[ORM\OneToMany(targetEntity: Message::class, mappedBy: 'Trip')]
    private Collection $messages;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
        $this->messages = new ArrayCollection();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getSender(): ?User
    {
        return $this->sender;
    }

    public function setSender(?User $sender): static
    {
        $this->sender = $sender;

        return $this;
    }

    public function getDepartureCountry(): ?string
    {
        return $this->departureCountry;
    }

    public function setDepartureCountry(string $departureCountry): static
    {
        $this->departureCountry = $departureCountry;

        return $this;
    }

    public function getDepartureCity(): ?string
    {
        return $this->departureCity;
    }

    public function setDepartureCity(string $departureCity): static
    {
        $this->departureCity = $departureCity;

        return $this;
    }

    public function getArrivalCountry(): ?string
    {
        return $this->arrivalCountry;
    }

    public function setArrivalCountry(string $arrivalCountry): static
    {
        $this->arrivalCountry = $arrivalCountry;

        return $this;
    }

    public function getArrivalCity(): ?string
    {
        return $this->arrivalCity;
    }

    public function setArrivalCity(string $arrivalCity): static
    {
        $this->arrivalCity = $arrivalCity;

        return $this;
    }

    public function getDepartureDate(): ?\DateTimeImmutable
    {
        return $this->departureDate;
    }

    public function setDepartureDate(\DateTimeImmutable $departureDate): static
    {
        $this->departureDate = $departureDate;

        return $this;
    }

    public function getAvailableWeight(): ?float
    {
        return $this->availableWeight;
    }

    public function setAvailableWeight(float $availableWeight): static
    {
        $this->availableWeight = $availableWeight;

        return $this;
    }

    public function getPricePerKg(): ?float
    {
        return $this->pricePerKg;
    }

    public function setPricePerKg(float $pricePerKg): static
    {
        $this->pricePerKg = $pricePerKg;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setTrip($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getTrip() === $this) {
                $reservation->setTrip(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): static
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setTrip($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): static
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getTrip() === $this) {
                $message->setTrip(null);
            }
        }

        return $this;
    }
}
